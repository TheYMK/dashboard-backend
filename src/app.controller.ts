import {
  Controller,
  Get,
} from '@nestjs/common';
import { AppService } from './app.service';
@Controller({
  path: '/api',
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  welcomeMessage(): { message: string } {
    return this.appService.getWelcomeMessage();
  }
}
