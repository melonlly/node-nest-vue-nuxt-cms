import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { logger } from './libs/utils';
import { cryptoString } from './libs/lib';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // logger(cryptoString("421125199308200010"));
    return this.appService.getHello();
  }
}
