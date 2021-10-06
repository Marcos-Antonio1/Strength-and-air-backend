import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

type Tipo = 'days' | 'scores'

@Entity("trophy")
export class trophyEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;    
    @Column()
    description:string;
    @Column()
    days_without_smoking:number;
    @Column({type:'enum',enum:['days','scores']})
    tipo:Tipo;
    @Column()
    pontuacao:number;
    
    /* @OneToMany(type =>userTrophyEntity, userTrophy =>userTrophy.trophy)
    userTrophys:userTrophyEntity[]; */



}