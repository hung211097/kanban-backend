import { Body, Controller, Post, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '~/services/auth/auth.service';
import { AuthDTO, LoginDTO } from './dto';
// import { JwtAuthGuard } from '~/services/auth/jwt-auth.guard';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly appService: AuthService) { }

  @Post('/register')
  register(@Body() authDto: AuthDTO): Promise<any> {
    return this.appService.register(authDto);
  }

  @Post('/login')
  login(@Body() authDto: LoginDTO): Promise<any> {
    return this.appService.login(authDto);
  }
}
