import { UserEntity } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { trophyEntity } from './trophy.entity';

@Entity('user_trophy')
export class userTrophyEntity{
    @Column()
    complete:boolean;
    @ManyToOne(type => UserEntity, user=>user.userTrophys, {primary:true})
    user:UserEntity;
    @ManyToOne(type =>trophyEntity,trophy=>trophy.userTrophys, {primary:true})
    trophy:trophyEntity;
}