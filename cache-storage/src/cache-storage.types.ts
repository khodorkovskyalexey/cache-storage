import { ModuleMetadata, Type } from '@nestjs/common';
import { RedisOptions } from 'ioredis';

export const CACHE_STORAGE_OPTIONS_PROVIDER_NAME = 'CACHE_STORAGE';

export type CacheStorageModuleOptions = RedisOptions;

export interface CacheStorageOptionsFactory {
  createOptions():
    | Promise<CacheStorageModuleOptions>
    | CacheStorageModuleOptions;
}

export interface CacheStorageModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<CacheStorageModuleOptions> | CacheStorageModuleOptions;
  useClass?: Type<CacheStorageOptionsFactory>;
  inject?: any[];
}
