import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createRegisterDaily } from './dto/create.register.daily';
import { testCreate } from './dto/test.create';
import { UserCreateDto } from './dto/user.create.dto';
import { userUpdateDto } from './dto/user.update.dto';

import { DepoimentCreateDto } from './dto/depoiment.create.dto';
import { DepoimentUpdateDto } from './dto/depoiment.update.dto';

import { DailyRegister } from './entity/registro.daily.entity';
import { DepoimentEntity } from './entity/depoiment.entity';
import { UserEntity } from './entity/user.entity';
import { dailyQuestEntity } from 'src/quest/entity/daily.quest.entity'; 
import { dailyQuestUser } from 'src/quest/entity/user.daily.quest.entity';
import { trophyEntity } from 'src/quest/entity/trophy.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly user:Repository<UserEntity>,
        @InjectRepository(DailyRegister)
        private readonly dailyRegister:Repository<DailyRegister>,
        @InjectRepository(DepoimentEntity)
        private readonly depoiment:Repository<DepoimentEntity>,
        @InjectRepository(dailyQuestEntity)
        private readonly quests:Repository<dailyQuestEntity>,
        @InjectRepository(dailyQuestUser)
        private readonly questUser:Repository<dailyQuestUser>,
        @InjectRepository(trophyEntity)
        private readonly trophy:Repository<trophyEntity>,
    ){}

    async register(data:UserCreateDto){
        
        let {daily_cigarettes, cigarette_pack_price,years_that_smoke} =data;
        data.lost_initial_money=this.calcValueSpent(daily_cigarettes, cigarette_pack_price,years_that_smoke);
        data.amount_smoked_cigarettes= this.calcAmountSmoked(years_that_smoke,daily_cigarettes)
        data.lost_initial_time = this.calcInitialTimeLost(daily_cigarettes,years_that_smoke);
        return await this.user.save(data);
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

    async update(id:string,data:userUpdateDto){
        
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
        register.user=user_found;
        // implementar depois essa validação de data
        //let dataAlreadyREgister = await this.checkDataRegister(id);

        let dailyQuests= await this.checkDailyQuests(user_found, data)
        await this.checkTroph(user_found)

        register = await this.dailyRegister.save(register);
        
        delete register.user;

        return {register,dailyQuests,}


    }

    async registerDayWithSmoke(user){
        user.days_without_smoking +=1;
        this.user.save(user)
    }
    async restartDaysWithSmoke(user){
        user.days_without_smoking =0;
        this.user.save(user)
    }
    async checkDailyQuests(user,data) {
        const diferenceExpectDailyCigarrets=user.daily_cigarettes-data.amount_cigarettes_today;
        if(diferenceExpectDailyCigarrets < 0) return;

        let questsCompleted= await this.quests.
        createQueryBuilder("daily_quest_entity").
        select().where("cigarette_quest =:num",
        {num:diferenceExpectDailyCigarrets}).getOne()
        
        if(questsCompleted) {
            await this.addPoints(user,questsCompleted)
            return questsCompleted; 
        } 
    }
    async addPoints(user, questsCompleted){  
        user.pontuacao +=questsCompleted.scoreQuest;
        await this.user.save(user);
        await this.UnlockerQuestDaily(user,questsCompleted);
        return;
    }
     // validação de data
    /* async checkDataRegister(id){ 
        let dataAtual = new Date().toISOString()
        dataAtual = dataAtual.slice(0,10)
        return await this.user.createQueryBuilder("user").
        innerJoinAndSelect("user.registers","registers")
        .where("user.id = :id",{id:id}).andWhere("registers.data like :data",{data:`${dataAtual}%`}).getMany();

    } */

    async UnlockerQuestDaily(user,quest){
        let quetsUser = {
            desbloqueada:true,
        }
        await this.questUser.createQueryBuilder().insert().
        into(dailyQuestUser).values({desbloqueada:true,dailyQuest:quest,user:user}).
        execute();
    }
    async checkTroph(user){
        let trophys = await this.trophy.createQueryBuilder('trophy').
        select().where('pontuacao<= :num',{num:user.pontuacao}).
        orWhere('days_without_smoking = :days',{days:user.days_without_smoking}).
        getMany();
        
        if(trophys){
            this.registerTrophyUser(user, trophys)
        }
    }
    async registerTrophyUser(user,trophy){
        user.trophy =trophy;

        try{
            await this.user.save(user);
        }catch(error){
            console.log(error)
        }
    } 
    async getDepoiments() {
        try {
            let depoiments_found = await this.depoiment.find();
            return depoiments_found;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    // esse talvez não precise, mas... kk
    async getDepoimentByID(id: string) {
            let depoiment_found = await this.depoiment.findOne(id);
            return depoiment_found;
    }

    async getDepoimentsByUser(id: string) {
        try {
            let depoiments_found = await this.depoiment.find({ 
                where: { 
                    user: { id: id } 
                },
            })
            return depoiments_found;
        } catch (error) {
            throw new NotFoundException(error.message); 
        }
    }

    async createDepoiment(id: string, data: DepoimentCreateDto) {

        try {
            let user_found = await this.findOne(id);
            let newDepoiment = this.depoiment.create(data);
            newDepoiment.user = user_found;

            return this.depoiment.save(newDepoiment);

        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async updateDepoiment(id: string, data: DepoimentUpdateDto) {
        
        try {
            let depoiment_found = await this.depoiment.findOne(id);
            let { title, text } = data;
            depoiment_found.title = title;
            depoiment_found.text = text;

            return this.depoiment.save(depoiment_found);

        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async deleteDepoiment(id: string) {
        try {
            let depoiment_found = await this.depoiment.findOne(id);

            return this.depoiment.remove(depoiment_found);

        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async getTrophys(id:string){
        let user_found = await this.findOne(id);
        return await this.user.createQueryBuilder().
        relation(UserEntity,"trophy").of(id).loadMany();
    }
}
