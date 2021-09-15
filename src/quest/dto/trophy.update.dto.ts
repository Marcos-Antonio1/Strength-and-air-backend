import { ApiProperty } from "@nestjs/swagger";

import { 
    IsNotEmpty,
    IsNumber,
    IsEnum
 } from "class-validator";

export class TrophyUpdateDto{
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    days_without_smoking:number;

    @IsNotEmpty()
    @ApiProperty()
    name:string;  

    @IsNotEmpty()
    @ApiProperty()
    description:string;
    

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    pontuacao:number;
}
