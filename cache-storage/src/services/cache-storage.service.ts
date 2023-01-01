export type Topic = string | number;

export abstract class CacheStorageService {
  abstract setValue(
    key: string,
    value: Record<string, any>,
    params?: {
      topic?: Topic;
      expireInSec?: number;
    },
  ): Promise<{
    key: string;
    value: Record<string, any>;
    expDate?: string;
  }>;

  abstract getValue<T>(key: string, topic?: Topic): Promise<null | T>;

  abstract deleteValue(key: string, topic?: Topic): Promise<boolean>;
}
