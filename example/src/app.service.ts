import { Injectable } from '@nestjs/common';
import { CacheStorageService } from 'libs/cache-storage/src';

@Injectable()
export class AppService {
  constructor(private readonly cacheStorageService: CacheStorageService) {}

  async caching(
    key: string,
    value: Record<string, any>,
    exp?: number,
    topic?: string,
  ) {
    return this.cacheStorageService.setValue(key, value, {
      expireInSec: exp,
      topic,
    });
  }

  async getCachingValue(key: string, topic?: string) {
    return this.cacheStorageService.getValue(key, topic);
  }
}
