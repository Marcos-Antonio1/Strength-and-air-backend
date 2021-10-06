import { Delete, Get, Param, Put } from "@nestjs/common";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrophyCreateDto } from "./dto/trophy.create.dto";
import { TrophyUpdateDto } from "./dto/trophy.update.dto";
import { TrophySeervice } from "./trophy.service";

@Controller('trophy')
@ApiTags('trophy')
export class trophyController{
    constructor(private readonly trophy:TrophySeervice ){}
    
    @Post('/register')
    @ApiOperation({summary:"Criar uma novo troféu"})
    @ApiResponse({status:200,description:'quest criada com sucesso'})
    async registerTrophy(@Body() body:TrophyCreateDto){
         return await this.trophy.resgisterTrophy(body)
    }

    @Put('/update:id')
    @ApiOperation({summary:"atualiza um troféu"})
    @ApiResponse({status:200,description:"troféu atualizada com sucesso"})
    async updateQuest(@Param('id')id:string,@Body() body:TrophyUpdateDto){
        return await this.trophy.updateTrophy(id,body);
    }

    @Delete('/delete:id')
    @ApiOperation({summary:"delete uma trophy"})
    @ApiResponse({status:200,description:"trophy deletada com sucesso"})
    async deleteQuest(@Param('id')id:string){
        return await this.trophy.deleteTrophy(id);
    }

    @Get('/alltrophys')
    @ApiOperation({summary:"delete uma trophy"})
    @ApiResponse({status:200,description:"trophy deletada com sucesso"})
    async getAllTrophys(){
        return this.trophy.getAllTrophys()
    }
}
    
    