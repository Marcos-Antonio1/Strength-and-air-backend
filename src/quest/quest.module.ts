import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dailyQuestEntity } from './entity/daily.quest.entity';
import { trophyEntity } from './entity/trophy.entity';
import { dailyQuestUser } from './entity/user.daily.quest.entity';
import { QuestController } from './quest.controller';
import { QuestService } from './quest.service';
import { trophyController } from './trophy.controller';
import { TrophySeervice } from './trophy.service';


@Module({
  imports: [TypeOrmModule.forFeature([dailyQuestEntity,trophyEntity,dailyQuestUser])],
  controllers: [QuestController,trophyController],
  providers: [QuestService,TrophySeervice],
})
export class QuestModule {}
