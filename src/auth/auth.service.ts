import { Injectable,Inject, forwardRef } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly user:UserService,
        private jwtService: JwtService
        ){}
    
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.user.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
          const { password, ...result } = user;
          return result;    
        }
        return null;
    }
    
    async login(user: any) {
        const userComplent = await this.user.findByEmail(user.email)
        const payload = { email: user.email, id: user.id };
        return {
          access_token: this.jwtService.sign(payload),
          user:userComplent,
        };
      }
}
