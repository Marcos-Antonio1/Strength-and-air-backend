import { Module } from '@nestjs/common';
import {ConfigModule , ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import {QuestModule} from './quest/quest.module';
import { DepoimentModule } from './depoiment/depoiment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject:[ConfigService],
        useFactory:(configService:ConfigService)=>({
          type: 'postgres',
          host: configService.get('DB_HOST','localhost'),
          port: Number(configService.get('DB_PORT',5432)),
          username: configService.get('DB_USERNAME','postgres'),
          password: configService.get('DB_PASSWORD','root'),
          database: configService.get('DB_TEST','ForcaEAr'),
          entities: [__dirname +'/**/*.entity{.js,.ts}'],
          synchronize: true,
      }),
    }),
    UserModule,
    QuestModule,
    DepoimentModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
