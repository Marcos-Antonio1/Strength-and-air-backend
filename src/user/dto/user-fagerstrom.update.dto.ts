import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsInt,
} from 'class-validator';

export class UserFagerstromUpdateDto{

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  initial_dependency_level:number;
}