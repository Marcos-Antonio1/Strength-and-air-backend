import { Column, CreateDateColumn,Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity({ name:'depoiment' })
export class DepoimentEntity {
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column()
    title:string;
    @Column()
    text:string;
    @CreateDateColumn()
    registedAt:Date;  

    @ManyToOne(() => UserEntity, user => user.depoiments)
    user:UserEntity;
} 