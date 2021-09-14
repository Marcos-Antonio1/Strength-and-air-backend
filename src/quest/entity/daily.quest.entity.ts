import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { dailyQuestUser } from "./user.daily.quest.entity";

@Entity()
export class dailyQuestEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nome:string;
    @Column()
    description:string;
    @Column()
    cigarette_quest:number;
    @Column()
    scoreQuest:number
    @OneToMany(type=>dailyQuestUser,dailyQuest =>dailyQuest.dailyQuest)
    dailysQuests:dailyQuestUser[];
}