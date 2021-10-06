import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { DepoimentCreateDto } from './dto/depoiment.create.dto';
import { DepoimentUpdateDto } from './dto/depoiment.update.dto';
import { DepoimentEntity } from './entity/depoiment.entity';

@Injectable()
export class DepoimentService {
    constructor(
    @InjectRepository(DepoimentEntity)
    private readonly depoiment:Repository<DepoimentEntity>,
    private readonly userService: UserService
    ){}

    async getDepoiments() {
        try {
            let depoiments_found = await this.depoiment.find();
            return depoiments_found;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

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
            let user_found = await this.userService.findOne(id);
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
}
