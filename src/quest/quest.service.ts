import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestCreateDto } from './dto/quest.create.dto';
import { dailyQuestEntity } from './entity/daily.quest.entity';

@Injectable()
export class QuestService {
    constructor(
        @InjectRepository(dailyQuestEntity)
        private readonly questDaily:Repository<dailyQuestEntity>
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
}
