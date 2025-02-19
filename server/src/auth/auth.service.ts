import { Injectable } from '@nestjs/common';
import { cryptoString } from '../libs/lib';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('auth service validateUser', username, password);
    const data = await this.usersService.findOneByName(username);

    console.log('auth service validateUser data', data);

    const user = JSON.parse(JSON.stringify(data || {}));

    password = cryptoString(password);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 登录
  async login(user: any) {
    console.log('login  xxxxxx', user);
    const payload = {
      id: user.id,
      name: user.name,
      password: user.password,
      card_no: user.card_no
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 登出
  async logout() {
    return {
      message: 'ok',
    };
  }
}
