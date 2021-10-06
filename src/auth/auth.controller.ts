import { Controller,Body, Post, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './ local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('user')
export class AuthController {
  
  constructor(private authService: AuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('/register')
  @ApiOperation({summary:"Realizar login"})
  @ApiResponse({status:200,description:'autenticação realizada'})
  @Post('auth/login')
  async login(@Body() body:LoginDto) {
    return this.authService.login(body);
  }
}
