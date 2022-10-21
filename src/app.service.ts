import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getWelcomeMessage(): { message: string } {
    return {
      message: 'Welcome to the DASHBOARD API V1',
    };
  }
}
