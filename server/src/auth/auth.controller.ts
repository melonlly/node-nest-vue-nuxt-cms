import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Log, logger } from 'src/libs/utils';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('user auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() loginUserDto: LoginUserDto, @Request() req) {
    // 登录账号为证件号
    loginUserDto.name = decodeURIComponent(loginUserDto.name);
    console.log('user auth ctrl ', loginUserDto.name);
    const user = await this.userService.findOneByPwd(loginUserDto);
    console.log(user);
    if (user && user.id) {
      Log({ req, user: user });
      return this.authService.login(user);
    } else {
      logger(`${loginUserDto.name} ${loginUserDto.password} 登录失败`);
      return {
        status: false,
        message: '登录失败',
      };
    }
  }
  // async login(@Body() loginUserDto: LoginUserDto) {
  //   return this.authService.login(loginUserDto);
  // }

  @Post('logout')
  @ApiOperation({ summary: '用户登出' })
  async logout() {
    return this.authService.logout();
  }
}
