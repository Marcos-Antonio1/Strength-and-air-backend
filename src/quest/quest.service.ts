import { forwardRef, Inject } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { QuestCreateDto } from './dto/quest.create.dto';
import { dailyQuestEntity } from './entity/daily.quest.entity';
import { trophyEntity } from './entity/trophy.entity';
import { dailyQuestUser } from './entity/user.daily.quest.entity';

@Injectable()
export class QuestService {
    constructor(
        @InjectRepository(dailyQuestEntity)
        private readonly questDaily:Repository<dailyQuestEntity>,
        @InjectRepository(dailyQuestUser)
        private readonly questUser:Repository<dailyQuestUser>,
        @InjectRepository(trophyEntity)
        private readonly trophy:Repository<trophyEntity>,
        
        @Inject(forwardRef(()=> UserService))
        private readonly user: UserService
    ){}

    async resgisterQuest(data:QuestCreateDto){
        return await this.questDaily.save(data);
    }
    async findOne(id:string){
        try{
            return await this.questDaily.findOneOrFail(id)
        }catch(error){
            throw new NotFoundException(error.message);
        }
    }
    async updateQuest(id,data:QuestCreateDto){
        const quest_found= await this.findOne(id);
        this.questDaily.merge(quest_found,data);
        return await this.questDaily.save(quest_found)
    }
    async deleteQuest(id){
        const quest_found= await this.findOne(id);
        this.questDaily.delete(quest_found);
    }

    async checkDailyQuests(user,data) {
        const diferenceExpectDailyCigarrets=user.daily_cigarettes-data.amount_cigarettes_today;
        if(diferenceExpectDailyCigarrets < 0) return;

        let questsCompleted= await this.questDaily.
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

    async getAll(){
        return this.questDaily.find();
    }
}
