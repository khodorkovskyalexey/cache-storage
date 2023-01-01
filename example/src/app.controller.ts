import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cache')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  cache(
    @Query('key') key: string,
    @Query('exp') exp: number | undefined,
    @Query('topic') topic: string | undefined,
    @Body() body: any,
  ) {
    return this.appService.caching(key, body, exp, topic);
  }

  @Get()
  getCache(
    @Query('key') key: string,
    @Query('topic') topic: string | undefined,
  ) {
    return this.appService.getCachingValue(key, topic);
  }
}
