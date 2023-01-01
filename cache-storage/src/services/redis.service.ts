import { Inject, Injectable } from '@nestjs/common';
import * as IoRedis from 'ioredis';
import IoRedisClient from 'ioredis';
import {
  CacheStorageModuleOptions,
  CACHE_STORAGE_OPTIONS_PROVIDER_NAME,
} from '../cache-storage.types';
import { CacheStorageService } from './cache-storage.service';

@Injectable()
export class RedisCacheStorageService implements CacheStorageService {
  private client: IoRedis.Redis;

  constructor(
    @Inject(CACHE_STORAGE_OPTIONS_PROVIDER_NAME)
    private readonly options: CacheStorageModuleOptions,
  ) {
    this.client = new IoRedisClient(this.options);
  }

  async setValue(
    key: string,
    value: Record<string, any>,
    params?: {
      topic?: string;
      expireInSec?: number;
    },
  ) {
    const keyWithTopic = params?.topic ? `${params.topic}__${key}` : key;

    if (params?.expireInSec) {
      return this.setValueWithExp(keyWithTopic, value, params.expireInSec);
    }

    await this.client.set(keyWithTopic, JSON.stringify(value));

    return { key: keyWithTopic, value };
  }

  async getValue<T>(key: string, topic?: string): Promise<null | T> {
    const keyWithTopic = topic ? `${topic}__${key}` : key;

    const value = await this.client.get(keyWithTopic);
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  }

  async deleteValue(key: string): Promise<boolean> {
    const res = await this.client.del(key);
    return Boolean(res);
  }

  private async setValueWithExp(
    key: string,
    value: Record<string, any>,
    expireInSec: number,
  ) {
    const now = new Date();
    now.setSeconds(now.getSeconds() + expireInSec);

    const expDateISO = now.toISOString();

    await this.client.set(
      key,
      JSON.stringify({ ...value, expDate: expDateISO }),
      'EX',
      expireInSec,
    );

    return {
      key,
      value,
      expDate: expDateISO,
    };
  }
}
