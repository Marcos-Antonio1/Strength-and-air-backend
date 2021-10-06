import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrophyCreateDto } from './dto/trophy.create.dto';
import { TrophyUpdateDto } from './dto/trophy.update.dto';
import { trophyEntity } from './entity/trophy.entity';

@Injectable()
export class TrophySeervice {
    constructor(
        @InjectRepository(trophyEntity)
        private readonly trophy:Repository<trophyEntity> 
    ){}
    async resgisterTrophy(data:TrophyCreateDto){
        return await this.trophy.save(data);
    }
    async findOne(id:string){
        try{
            return await this.trophy.findOneOrFail(id)
        }catch(error){
            throw new NotFoundException(error.message);
        }
    }
    async updateTrophy(id,data:TrophyUpdateDto){
        const trophy_found = await this.findOne(id)
        this.trophy.merge(trophy_found,data);
        return await this.trophy.save(trophy_found);
    }
    async deleteTrophy(id){
        const trophy_found = await this.findOne(id);
        return this.trophy.delete(trophy_found);
    }
    async getAllTrophys(){
        return this.trophy.find()
    }  
}
