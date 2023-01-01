import { CacheStorageModuleOptions } from 'libs/cache-storage/src';

export const redisFactory = {
  useFactory: (): CacheStorageModuleOptions => {
    return {
      port: 6379,
      host: 'localhost',
    };
  },
};
