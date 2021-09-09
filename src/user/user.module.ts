import { Module } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyRegister } from './entity/registro.daily.entity';
import { DepoimentEntity } from './entity/depoiment.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity,DailyRegister,DepoimentEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
