import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsEmail,
    IsInt,
    IsNumber
} from "class-validator";
export class UserCigaretteInfoUpdateDto {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    daily_cigarettes:number;
    
    @IsNotEmpty()   
    @IsNumber()
    @ApiProperty()
    cigarette_pack_price:number;
}