import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
} from 'class-validator';

export class DepoimentUpdateDto {
    @IsNotEmpty()
    @ApiProperty()
    title:string;

    @IsNotEmpty()
    @ApiProperty()
    text:string;
}