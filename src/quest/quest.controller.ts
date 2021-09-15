import { Delete, Param, Put } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestCreateDto } from './dto/quest.create.dto';
import { QuestService } from './quest.service';

@Controller('quest')
@ApiTags('quest')
export class QuestController {
    constructor(private readonly questsService: QuestService){}
    @Post('/register')
    @ApiOperation({summary:"Criar uma nova quest"})
    @ApiResponse({status:200,description:'quest criada com sucesso'})
    async registerQuest(@Body() body:QuestCreateDto){
        return await this.questsService.resgisterQuest(body)
    }
    @Put('/update:id')
    @ApiOperation({summary:"atualiza uma quest diária"})
    @ApiResponse({status:200,description:"Quest atualizada com sucesso"})
    async updateQuest(@Param('id')id:string,@Body() body:QuestCreateDto){
        return await this.questsService.updateQuest(id,body);
    }

    @Delete('/delete:id')
    @ApiOperation({summary:"delete uma quest"})
    @ApiResponse({status:200,description:"Quest deletada com sucesso"})
    async deleteQuest(@Param('id')id:string){
        return await this.questsService.deleteQuest(id)
    }
}
