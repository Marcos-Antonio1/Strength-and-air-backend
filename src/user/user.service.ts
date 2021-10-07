
import { ConflictException, forwardRef, Inject } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { QuestService } from 'src/quest/quest.service';
import { Repository } from 'typeorm';
import { createRegisterDaily } from './dto/create.register.daily';
import { testCreate } from './dto/test.create';
import { UserCreateDto } from './dto/user.create.dto';
import { UserPersonalUpdateDto } from './dto/user-personal.update.dto';
import { UserCigaretteInfoUpdateDto } from './dto/user-cigarette-info.update.dto';
import { UserFagerstromUpdateDto } from './dto/user-fagerstrom.update.dto';
import * as bcrypt from 'bcrypt';

import { DailyRegister } from './entity/registro.daily.entity';
import { UserEntity } from './entity/user.entity';
import { NotAcceptableException } from '@nestjs/common';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly user:Repository<UserEntity>,
        @InjectRepository(DailyRegister)
        private readonly dailyRegister:Repository<DailyRegister>,
        @Inject(forwardRef(()=>QuestService))
        private readonly quest: QuestService
    ){}
    async register(data:UserCreateDto){
        
        let {daily_cigarettes, cigarette_pack_price,years_that_smoke} =data;
        data.lost_initial_money=this.calcValueSpent(daily_cigarettes, cigarette_pack_price,years_that_smoke);
        data.amount_smoked_cigarettes= this.calcAmountSmoked(years_that_smoke,daily_cigarettes)
        data.lost_initial_time = this.calcInitialTimeLost(daily_cigarettes,years_that_smoke);
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password,salt)
        try{
            return await this.user.save(data);
        }catch(error){
            if(error.code == 23505){
                throw new ConflictException('Esse usuário já está cadastrado')
            }else{
                throw error;
            }
        }
    }
    calcValueSpent(daily_cigarettes, cigarette_pack_price,years_that_smoke):number {
        
        let days_smoke =this.calcDaysSmoke(years_that_smoke);
        let price_one_cigarette =(cigarette_pack_price/20);
        let cost_one_day = price_one_cigarette*daily_cigarettes;

        return days_smoke*cost_one_day;
    }
    calcAmountSmoked(years_that_smoke,daily_cigarettes):number{
        
        let days_smoke =this.calcDaysSmoke(years_that_smoke);
        return days_smoke *daily_cigarettes;
    }
    calcDaysSmoke(years_that_smoke):number{
        
        return years_that_smoke*365;
    }
    calcInitialTimeLost(daily_cigarettes,years_that_smoke):number{

        let days_smoke =this.calcDaysSmoke(years_that_smoke);
        return days_smoke * daily_cigarettes;

    }
    async findOne(id:string){
        try{
            return await this.user.findOneOrFail(id)
        }catch(error){
            throw new NotFoundException(error.message);
        }
    }

    async findByEmail(email:string){
        console.log(`estou aqui ${email}`)
        const user = await this.user.findOne({email}) 
        console.log(user)
        return user;
    }

    async updatePersonalData(id:string,data:UserPersonalUpdateDto){
        const user_found = await this.findOne(id);
        this.user.merge(user_found,data);
        return await this.user.save(user_found);
    }

    async updateCigaretteInfo(id:string,data:UserCigaretteInfoUpdateDto){
        const user_found = await this.findOne(id);
        this.user.merge(user_found,data);
        return await this.user.save(user_found);
    }

    async updateFagerstromTest(id:string,data:UserFagerstromUpdateDto){
        const user_found = await this.findOne(id);
        this.user.merge(user_found,data);
        return await this.user.save(user_found);
    }

    async testInitialDependecysLevel(id:string,data:testCreate){

        let user_found = await this.findOne(id);
        user_found.initial_dependency_level=data.initial_dependency_level;
        return await this.user.save(user_found);

    }

    async testCurrentDependecysLevel(id:string,data:testCreate){

        let user_found = await this.findOne(id);
        user_found.current_dependency_level=data.initial_dependency_level;
        return await this.user.save(user_found);

    }

    async registerDaily(id:string,data:createRegisterDaily){

        let user_found = await this.findOne(id);
        
        if(data.amount_cigarettes_today === 0){
            await this.registerDayWithSmoke(user_found)
        }else if(user_found.days_without_smoking >0){
            await this.restartDaysWithSmoke(user_found);
        }

        let price_one_cigarette =(user_found.cigarette_pack_price/20);
        // mutiplica  a quantidade de cigarros pelo seu valor unitário
        data.daily_lost_money=data.amount_cigarettes_today*price_one_cigarette;
        //Calcula o valor esperado que se gaste com cigarro, de acordo com o consumo diário
        let expect_spend_money= user_found.daily_cigarettes*price_one_cigarette; 
        // o valor esperado menos o valor gasto= valor economizado
        let money_saved = expect_spend_money -data.daily_lost_money;
        money_saved >0 ? data.money_saved_daily=money_saved : data.money_saved_daily=0  
        // cigarros x tempo de vida perdido
        data.lost_life_time= data.amount_cigarettes_today*11;
        // tempo de vida esperado que se perca de acordo com o consumo diário
        let expect_spend_time=user_found.daily_cigarettes *11; 
        // o tempo de vida esperado - o tempo de vida gasto = tempo de vida salvo
        let time_life_saved=expect_spend_time- data.lost_life_time;
        time_life_saved >0 ? data.lifetime_saved_daily=time_life_saved: data.lifetime_saved_daily=0;

        let register =this.dailyRegister.create(data);
        
        register.data = this.formartDate()
        
        /* if(this.checkRegisterDay(id)) { 
            throw new NotAcceptableException({message:"o registro diário já foi cadastrado hoje"})
            return;
        }  */

        register.user=user_found;


        let dailyQuests= await this.quest.checkDailyQuests(user_found, data)
        await this.quest.checkTroph(user_found)

        register = await this.dailyRegister.save(register);
        
        delete register.user;

        return {register,dailyQuests}

    }
    async registerDayWithSmoke(user){
        user.days_without_smoking +=1;
        this.user.save(user)
    }
    async restartDaysWithSmoke(user){
        user.days_without_smoking =0;
        this.user.save(user)
    }
    
    async getTrophys(id:string){
        let user_found = await this.findOne(id);
        return await this.user.createQueryBuilder().
        relation(UserEntity,"trophy").of(id).loadMany();
    }

    formartDate(){
        let date = new Date();
        return new Date(date.getFullYear(),date.getMonth(),date.getDay())
    }

    checkRegisterDay(id:string){
        const dataAtual = this.formartDate()
        try{
            this.dailyRegister.createQueryBuilder('dailyRegister').
            where("userId = :id",{id}).andWhere("data = :dataAtual",{dataAtual}).
            getOneOrFail();
        }catch(error){
            return false;
        }
        return true;
    }
    
    async evolutionData(id){
        const time = await this.dailyRegister.createQueryBuilder('dailyRegister')
        .select("SUM(dailyRegister.lifetime_saved_daily)","lifesave")
        .where("dailyRegister.userId = :id",{id}).getRawMany()
        
         const money= await this.dailyRegister.createQueryBuilder('dailyRegister')
        .select("SUM(dailyRegister.money_saved_daily)","money_saved")
        .where("dailyRegister.userId = :id",{id}).getRawMany()

        const cigarrete = await this.dailyRegister.createQueryBuilder('dailyRegister')
        .select("SUM(dailyRegister.amount_cigarettes_today)","cigarrete")
        .where("dailyRegister.userId = :id",{id}).getRawMany() 

        return {lifesave:time[0],moneysave:money[0],cigarrete:cigarrete[0]}
    }

    async save(user){
      return await this.user.save(user);
    }
}
