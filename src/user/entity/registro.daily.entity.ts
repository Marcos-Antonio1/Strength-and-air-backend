import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,ManyToOne} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({name:'dailyRegister'})
export class DailyRegister {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    amount_cigarettes_today:number;
    @Column({nullable:true})
    days_without_smoking:number;
    @CreateDateColumn()
    data:Date;
    @Column({type:'decimal'})
    daily_lost_money:number;
    @Column({type:'decimal'})
    money_saved_daily:number;
    @Column()
    lost_life_time:number;
    @Column()
    lifetime_saved_daily:number;

    @ManyToOne(()=> UserEntity,user =>user.registers)
    user:UserEntity;
}