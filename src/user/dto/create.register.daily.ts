import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber

} from 'class-validator';

export class createRegisterDaily{
      
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    amount_cigarettes_today:number;
    
     
    daily_lost_money:number;
    
    money_saved_daily:number;
    
    lost_life_time:number;
    
    lifetime_saved_daily:number;
    
}