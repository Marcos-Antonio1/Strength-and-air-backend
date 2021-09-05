import { Module } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyRegister } from './entity/registro.daily.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity,DailyRegister])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
