import { Module } from '@nestjs/common';
import { CacheStorageModule } from 'libs/cache-storage/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { redisFactory } from './configs/redis.factory';

@Module({
  imports: [CacheStorageModule.forRootAsync(redisFactory)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
