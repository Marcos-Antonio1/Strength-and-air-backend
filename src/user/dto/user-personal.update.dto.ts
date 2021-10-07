import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsEmail,
    IsInt,
    IsNumber
} from "class-validator";
export class UserPersonalUpdateDto {
    @IsNotEmpty()
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
    years_that_smoke:number;
    
    @IsNotEmpty()   
    @IsInt()
    @ApiProperty()
    age:number;

}