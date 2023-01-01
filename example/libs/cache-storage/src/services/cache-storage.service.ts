export abstract class CacheStorageService {
  abstract setValue(
    key: string,
    value: Record<string, any>,
    params?: {
      topic?: string;
      expireInSec?: number;
    },
  ): Promise<{
    key: string;
    value: Record<string, any>;
    expDate?: string;
  }>;

  abstract getValue<T>(key: string, topic?: string): Promise<null | T>;

  abstract deleteValue(key: string): Promise<boolean>;
}
