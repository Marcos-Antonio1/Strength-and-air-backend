import {  Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions:{expiresIn: '3600s'}
    }),
    UserModule
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  exports :[AuthService]
})
export class AuthModule {}
