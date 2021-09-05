import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,

} from 'class-validator';

export class testCreate{

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  initial_dependency_level:number;
}