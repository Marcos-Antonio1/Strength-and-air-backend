import { UserEntity } from 'src/user/entity/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { dailyQuestEntity } from './daily.quest.entity';

@Entity('user_daily_quest')
export class dailyQuestUser{
    @ManyToOne(type => UserEntity,user=>user.dailysQuests,{primary:true})
    user:UserEntity;
    @ManyToOne(type => dailyQuestEntity,daily=>daily.dailysQuests,{primary:true})
    dailyQuest:dailyQuestEntity;
    @CreateDateColumn({primary:true})
    dia:Date
    @Column()
    desbloqueada:boolean;
}