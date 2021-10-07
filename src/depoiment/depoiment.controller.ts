import { UseGuards } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DepoimentService } from './depoiment.service';
import { DepoimentCreateDto } from './dto/depoiment.create.dto';
import { DepoimentUpdateDto } from './dto/depoiment.update.dto';

@Controller('depoiment')
@ApiBearerAuth()
@ApiTags('depoiment')
export class DepoimentController {

    constructor(private readonly depoiment: DepoimentService){}
    
    //@UseGuards(JwtAuthGuard)
    @Get('/depoiments')
    @ApiOperation({ summary: "Recupera todos os depoimentos" })
    async getDepoiments(){
        return await this.depoiment.getDepoiments();
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/depoiments/:id')
    @ApiOperation({ summary: "Recupera todos os depoimentos por usuário" })
    async getDepoimentsByUser(@Param('id') id: string){
        return await this.depoiment.getDepoimentsByUser(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/depoiment/:id')
    @ApiOperation({ summary: "Recupera depoimento por ID" })
    async getDepoimentByID(@Param('id') id: string){
        return await this.depoiment.getDepoimentByID(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Post('/depoiment/:id')
    @ApiOperation({ summary: "Cadastra depoimento" })
    async createDepoiment(@Param('id') id: string, @Body() body: DepoimentCreateDto){
        return await this.depoiment.createDepoiment(id, body);
    }

    //@UseGuards(JwtAuthGuard)
    @Put('/depoiment/:id')
    @ApiOperation({ summary: "Atualiza depoimento" })
    async updateDepoiment(@Param('id') id: string, @Body() body: DepoimentUpdateDto){
        return await this.depoiment.updateDepoiment(id, body);
    }
    
    //@UseGuards(JwtAuthGuard)
    @Delete('/depoiment/:id')
    @ApiOperation({ summary: "Deleta depoimento" })
    async deleteDepoiment(@Param('id') id: string){
        return await this.depoiment.deleteDepoiment(id);
    }
    
}
