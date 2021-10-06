import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { DepoimentController } from './depoiment.controller';
import { DepoimentService } from './depoiment.service';
import { DepoimentEntity } from './entity/depoiment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepoimentEntity]),
  UserModule,
],
  controllers: [DepoimentController],
  providers: [DepoimentService],
  exports:[DepoimentService],
})
export class DepoimentModule {}
