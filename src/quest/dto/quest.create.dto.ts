import { ApiProperty } from "@nestjs/swagger";
import { 
    IsNotEmpty,
    IsNumber
 } from "class-validator";

export class QuestCreateDto{
    @IsNotEmpty()
    @ApiProperty()
    nome:string;

    @IsNotEmpty()
    @ApiProperty()
    description:string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    cigarette_quest:number;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    scoreQuest:number
}