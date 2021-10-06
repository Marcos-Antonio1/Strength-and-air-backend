import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsInt,
    IsEmail,
    IsNumber,
    Matches,
} from 'class-validator';
export class UserCreateDto{

    @IsNotEmpty()
    @ApiProperty()
    name:string

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    age:number;
    
    @IsNotEmpty()
    @ApiProperty()
    occupation:string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email:string;
    
    @IsNotEmpty()
    @ApiProperty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:"A senha deve conter letras maiúsculas e minúsculas pelo menos um caractere especial e números"})
    password:string;
    
    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    years_that_smoke:number;
    
    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    daily_cigarettes:number; 
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    cigarette_pack_price:number;

    amount_smoked_cigarettes:number;
    lost_initial_money:number;
    lost_initial_time:number;
    days_without_smoking:number;

}