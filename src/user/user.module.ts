import { Module } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyRegister } from './entity/registro.daily.entity';
import { DepoimentEntity } from './entity/depoiment.entity';
import { dailyQuestEntity } from 'src/quest/entity/daily.quest.entity';
import { dailyQuestUser } from 'src/quest/entity/user.daily.quest.entity';
//import { userTrophyEntity } from 'src/quest/entity/user.trophy.entity';
import { trophyEntity } from 'src/quest/entity/trophy.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity,DailyRegister,DepoimentEntity,dailyQuestEntity,dailyQuestUser,trophyEntity,/*userTrophyEntity*/])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
