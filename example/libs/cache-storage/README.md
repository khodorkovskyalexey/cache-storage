# CacheStorageModule


**CacheStorageService**

```typescript
setValue(
  key: string,
  value: Record<string, any>,
  params?: {
    topic?: string;
    expireInSec?: number;
  }
): Promise<{
  key: string,
  value: Record<string, any>,
  expDate?: string
}>
```
```typescript
async getValue<T>(key: string, topic?: string): Promise<null | T>
```
```typescript
async deleteValue(key: string): Promise<boolean>
```

### Example

With `factory` init options
```
CacheStorageModule.forRootAsync(redisFactory),
```

<details>
  <summary>redis.factory.ts</summary>

  ```javascript
  import { ConfigService } from '@nestjs/config';
  import { CacheStorageModuleOptions } from "@libs/cache-storage";

  export const redisFactory = {
    useFactory: (configService: ConfigService): CacheStorageModuleOptions => {
      return {
        port: configService.get<number>('redis.port'),
        host: configService.get<string>('redis.host'),
      };
    },
    inject: [ConfigService],
  };
  ```

</details>
