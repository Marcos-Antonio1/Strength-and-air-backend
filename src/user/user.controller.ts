import { Delete, Post, Put } from '@nestjs/common';
import { Body, Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createRegisterDaily } from './dto/create.register.daily';
import { testCreate } from './dto/test.create';
import { UserCreateDto } from './dto/user.create.dto';
import { userUpdateDto } from './dto/user.update.dto';
import { UserService } from './user.service';

import { DepoimentCreateDto } from './dto/depoiment.create.dto';
import { DepoimentUpdateDto } from './dto/depoiment.update.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('/register')
    @ApiOperation({summary:"Criar um novo usuário"})
    @ApiResponse({status:200,description:'usuário criado com sucesso'})
    async register(@Body() body:UserCreateDto){
        return await this.userService.register(body);
    }

    @Put('/update:id')
    @ApiOperation({summary:"Atualizar dados do usuário"})
    async update(@Param('id')id:string,@Body() body:userUpdateDto){
        return await this.userService.update(id,body);
    }

    @Post('/testInitial:id')
    @ApiOperation({summary:"Insere o valor do teste de depedência inical"})
    async testInitial(@Param('id')id:string,@Body() body:testCreate){
        return await this.userService.testInitialDependecysLevel(id,body);
    }

    @Put('/testCurrent:id')
    @ApiOperation({summary:"Atualiza o valor do teste de depedência"})
    async testCurrent(@Param('id')id:string,@Body() body:testCreate){
        return await this.userService.testCurrentDependecysLevel(id,body);
    }
    @Post('/dailyRegister:id')
    @ApiOperation({summary:"Cadastra o registro diário"})
    async dailyRegister(@Param('id')id:string,@Body() body:createRegisterDaily){
        return await this.userService.registerDaily(id,body);
    }

    
    @Get('/depoiments')
    @ApiOperation({ summary: "Recupera todos os depoimentos" })
    async getDepoiments(){
        return await this.userService.getDepoiments();
    }

    @Get('/depoiments/:id')
    @ApiOperation({ summary: "Recupera todos os depoimentos por usuário" })
    async getDepoimentsByUser(@Param('id') id: string){
        return await this.userService.getDepoimentsByUser(id);
    }

    @Get('/depoiment/:id')
    @ApiOperation({ summary: "Recupera depoimento por ID" })
    async getDepoimentByID(@Param('id') id: string){
        return await this.userService.getDepoimentByID(id);
    }

    @Post('/depoiment/:id')
    @ApiOperation({ summary: "Cadastra depoimento" })
    async createDepoiment(@Param('id') id: string, @Body() body: DepoimentCreateDto){
        return await this.userService.createDepoiment(id, body);
    }

    @Put('/depoiment/:id')
    @ApiOperation({ summary: "Atualiza depoimento" })
    async updateDepoiment(@Param('id') id: string, @Body() body: DepoimentUpdateDto){
        return await this.userService.updateDepoiment(id, body);
    }

    @Delete('/depoiment/:id')
    @ApiOperation({ summary: "Deleta depoimento" })
    async deleteDepoiment(@Param('id') id: string){
        return await this.userService.deleteDepoiment(id);
    }

    @Get('/trophys/:id')
    @ApiOperation({ summary: "Regesta todos os troféus do usuário"})
    async Mytrophy(@Param('id') id: string){
        return await this.userService.getTrophys(id);
    }
}
