import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsEmail,
    IsInt,
    IsNumber
} from "class-validator";
export class userUpdateDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email:string;

    @IsNotEmpty()
    @ApiProperty()
    name:string;

    @IsNotEmpty()
    @ApiProperty()
    occupation:string;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    daily_cigarettes:number;
    
    @IsNotEmpty()   
    @IsNumber()
    @ApiProperty()
    cigarette_price:number;

}