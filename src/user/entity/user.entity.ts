import {BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,OneToMany, JoinTable, ManyToMany} from 'typeorm';
import {genSaltSync,hashSync} from 'bcrypt';
import { DailyRegister } from './registro.daily.entity';
import { DepoimentEntity } from './depoiment.entity';
//import { userTrophyEntity } from 'src/quest/entity/user.trophy.entity';
import { dailyQuestUser } from 'src/quest/entity/user.daily.quest.entity';
import { trophyEntity } from 'src/quest/entity/trophy.entity';


@Entity({name:'user'})
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column()
    name:string
    @Column()
    age:number;
    @Column()
    occupation:string;
    @Column({ type: "varchar", length: 80, unique: true })
    email:string;
    @Column({ select: false })
    password:string;
    @Column()
    years_that_smoke:number;
    @Column()
    daily_cigarettes:number; 
    @Column({type:"decimal"})
    cigarette_pack_price :number;
    @Column({nullable: true})
    initial_dependency_level :number;
    @Column({nullable: true})
    current_dependency_level:number;
    @Column()
    amount_smoked_cigarettes:number;
    @Column({type:"decimal"})
    lost_initial_money:number;
    @Column()
    lost_initial_time:number; 
    @CreateDateColumn()
    registedAt:Date;
    @Column({nullable: true})
    pontuacao:number;
    @Column({nullable:true})
    days_without_smoking:number;
    
    @OneToMany(type => DailyRegister, register => register.user)
    @JoinTable()
    registers: DailyRegister[];

    @OneToMany(type => DepoimentEntity, depoiment => depoiment.user)
    depoiments: DepoimentEntity[];
    

    @ManyToMany(()=>trophyEntity)
    @JoinTable()
    trophy:trophyEntity[]
    
    @OneToMany(type=>dailyQuestUser,dailyQuest =>dailyQuest.user)
    dailysQuests:dailyQuestUser[];
    
    // Arrumar 
    /* @BeforeInsert()
    hashPassword(){
        // guardar em variável de ambiente depois
        const salt=genSaltSync(25)
        this.password=  hashSync(this.password,salt);
    } */
}