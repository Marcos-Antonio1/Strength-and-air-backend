import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dailyQuestEntity } from './entity/daily.quest.entity';
import { trophyEntity } from './entity/trophy.entity';
import { dailyQuestUser } from './entity/user.daily.quest.entity';
import { userTrophyEntity } from './entity/user.trophy.entity';
import { QuestController } from './quest.controller';
import { QuestService } from './quest.service';


@Module({
  imports: [TypeOrmModule.forFeature([dailyQuestEntity,trophyEntity,dailyQuestUser,userTrophyEntity])],
  controllers: [QuestController],
  providers: [QuestService],
  /* exports: [
    dailyQuestEntity,
    trophyEntity,
    userTrophyEntity,
  ] */
})
export class QuestModule {}
