import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import {
  CacheStorageModuleAsyncOptions,
  CacheStorageOptionsFactory,
  CACHE_STORAGE_OPTIONS_PROVIDER_NAME,
} from './cache-storage.types';
import { CacheStorageService, RedisCacheStorageService } from './services';

@Module({})
export class CacheStorageModule {
  private static readonly usageProvider: Provider = {
    provide: CacheStorageService,
    useClass: RedisCacheStorageService,
  };

  static forRootAsync(options: CacheStorageModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: CacheStorageModule,
      imports: options.imports,
      providers: [...asyncProviders, this.usageProvider],
      exports: [this.usageProvider],
    };
  }

  private static createAsyncProviders(
    options: CacheStorageModuleAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<CacheStorageOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: CacheStorageModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: CACHE_STORAGE_OPTIONS_PROVIDER_NAME,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [options.useClass as Type<CacheStorageOptionsFactory>];

    return {
      provide: CACHE_STORAGE_OPTIONS_PROVIDER_NAME,
      useFactory: async (optionsFactory: CacheStorageOptionsFactory) =>
        await optionsFactory.createOptions(),
      inject,
    };
  }
}
