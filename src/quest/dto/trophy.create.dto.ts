import { ApiProperty } from "@nestjs/swagger";

import { 
    IsNotEmpty,
    IsNumber,
    IsEnum
 } from "class-validator";
 export enum Tipo {
    days = 'days',
    scores = 'scores'
  }
export class TrophyCreateDto{
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
    @IsEnum(Tipo)
    @ApiProperty()
    tipo:Tipo;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    pontuacao:number;
}
