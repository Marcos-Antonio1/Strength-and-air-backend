import { forwardRef, Module } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyRegister } from './entity/registro.daily.entity';
import { QuestModule } from 'src/quest/quest.module';

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity,DailyRegister]),
  forwardRef(()=>QuestModule),
],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
