import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
} from 'class-validator';

export class DepoimentCreateDto {
    @IsNotEmpty()
    @ApiProperty()
    title:string;

    @IsNotEmpty()
    @ApiProperty()
    text:string;
}