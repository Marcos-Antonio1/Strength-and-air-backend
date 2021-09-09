import {BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,OneToMany} from 'typeorm';
import {genSaltSync,hashSync} from 'bcrypt';
import { DailyRegister } from './registro.daily.entity';
import { DepoimentEntity } from './depoiment.entity';

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
    @Column()
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
    
    @OneToMany(type => DailyRegister, register => register.user)
    registers: DailyRegister[];

    @OneToMany(type => DepoimentEntity, depoiment => depoiment.user)
    depoiments: DepoimentEntity[];
    

    // Arrumar 
    /* @BeforeInsert()
    hashPassword(){
        // guardar em variável de ambiente depois
        const salt=genSaltSync(25)
        this.password=  hashSync(this.password,salt);
    } */
}