import { Post,Put,Body, Controller, Get,Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createRegisterDaily } from './dto/create.register.daily';
import { testCreate } from './dto/test.create';
import { UserCreateDto } from './dto/user.create.dto';
import { UserPersonalUpdateDto } from './dto/user-personal.update.dto';
import { UserCigaretteInfoUpdateDto } from './dto/user-cigarette-info.update.dto';
import { UserFagerstromUpdateDto } from './dto/user-fagerstrom.update.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('/:id')
    @ApiOperation({ summary: 'Recupera um usuário pelo ID' })
    @ApiResponse({ status: 200, description: 'Recuperado com sucesso.' })
    async getUser(@Param('id') id: string) {
        return await this.userService.findOne(id);
    }

    @Post('/register')
    @ApiOperation({summary:"Criar um novo usuário"})
    @ApiResponse({status:200,description:'usuário criado com sucesso'})
    async register(@Body() body:UserCreateDto){
        return await this.userService.register(body);
    }

    @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Put('/update-personal/:id')
    @ApiOperation({summary:"Atualizar dados pessoais do usuário"})
    async updatePersonalData(@Param('id') id: string,@Body() body:UserPersonalUpdateDto){
        return await this.userService.updatePersonalData(id,body);
    }

    @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Put('/update-cigarette-info/:id')
    @ApiOperation({summary:"Atualizar dados sobre cigarros do usuário"})
    async updateCigaretteInfo(@Param('id') id: string,@Body() body:UserCigaretteInfoUpdateDto){
        return await this.userService.updateCigaretteInfo(id,body);
    }

    @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Put('/update-fagerstrom-test/:id')
    @ApiOperation({summary:"Atualizar teste de fagerström do usuário"})
    async updateFagerstromTest(@Param('id') id: string,@Body() body:UserFagerstromUpdateDto){
        return await this.userService.updateFagerstromTest(id,body);
    }

    @Post('/testInitial:id')
    @ApiOperation({summary:"Insere o valor do teste de depedência inical"})
    async testInitial(@Param('id')id:string,@Body() body:testCreate){
        return await this.userService.testInitialDependecysLevel(id,body);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('/testCurrent:id')
    @ApiOperation({summary:"Atualiza o valor do teste de depedência"})
    async testCurrent(@Param('id')id:string,@Body() body:testCreate){
        return await this.userService.testCurrentDependecysLevel(id,body);
    }

    @ApiBearerAuth()
    /* @UseGuards(JwtAuthGuard) */ 
    @Post('/dailyRegister:id')
    @ApiOperation({summary:"Cadastra o registro diário"})
    async dailyRegister(@Param('id')id:string,@Body() body:createRegisterDaily){
        console.log("cheguei aqui")
        return await this.userService.registerDaily(id,body);
    }

    @ApiBearerAuth()
    /* @UseGuards(JwtAuthGuard) */
    @Get('/trophys/:id')
    @ApiOperation({ summary: "Resgasta todos os troféus do usuário"})
    async Mytrophy(@Param('id') id: string){
        return await this.userService.getTrophys(id);
    }

    @ApiBearerAuth()
    /* @UseGuards(JwtAuthGuard) */
    @Get('/evolutionData/:id')  
    @ApiOperation({ summary: "Regasta os dados atual da evolução do usuario"})
    async getEvolutionData(@Param('id') id: string){
        return await this.userService.evolutionData(id)
    }
}
