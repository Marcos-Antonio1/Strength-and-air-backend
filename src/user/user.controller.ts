import { 
    Post,Put,Body, Controller, Get,Param, UseGuards 
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createRegisterDaily } from './dto/create.register.daily';
import { testCreate } from './dto/test.create';
import { UserCreateDto } from './dto/user.create.dto';
import { userUpdateDto } from './dto/user.update.dto';
import { UserService } from './user.service';


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

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
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

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('/testCurrent:id')
    @ApiOperation({summary:"Atualiza o valor do teste de depedência"})
    async testCurrent(@Param('id')id:string,@Body() body:testCreate){
        return await this.userService.testCurrentDependecysLevel(id,body);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard) 
    @Post('/dailyRegister:id')
    @ApiOperation({summary:"Cadastra o registro diário"})
    async dailyRegister(@Param('id')id:string,@Body() body:createRegisterDaily){
        return await this.userService.registerDaily(id,body);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/trophys/:id')
    @ApiOperation({ summary: "Regesta todos os troféus do usuário"})
    async Mytrophy(@Param('id') id: string){
        return await this.userService.getTrophys(id);
    }
}
