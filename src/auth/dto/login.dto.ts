import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty,IsEmail} from 'class-validator';

export class LoginDto {

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    password: string
}