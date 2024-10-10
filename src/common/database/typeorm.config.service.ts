import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { entityList } from './entities';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('DB_TYPE', { infer: true }),
      host: this.configService.get('DB_HOST', { infer: true }),
      port: this.configService.get('DB_PORT', { infer: true }),
      username: this.configService.get('DB_USER', { infer: true }),
      password: this.configService.get('DB_PASSWORD', { infer: true }),
      database: this.configService.get('DB_NAME', { infer: true }),
      synchronize: false,
      dropSchema: false,
      keepConnectionAlive: true,
      connectTimeout: this.configService.get('DB_CONNECT_TIMEOUT', {
        infer: true,
      }),
      logging:
        this.configService.get('NODE_ENV', { infer: true }) !== 'production',
      entities: entityList,
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
      },
      extra: {
        application_name: `Landwich_${
          this.configService.get('NODE_ENV') === 'production'
            ? 'Prod'
            : this.configService.get('NODE_ENV') === 'development'
            ? 'Dev'
            : 'Local'
        }`,

        // based on https://node-postgres.com/apis/pool
        // max connection pool size
        max: this.configService.get('DB_MAX_CONNECTIONS', { infer: true }),
        ssl: this.configService.get('sslEnabled', { infer: true })
          ? {
              rejectUnauthorized: this.configService.get('rejectUnauthorized', {
                infer: true,
              }),
              ca: this.configService.get('ca', { infer: true }) ?? undefined,
              key: this.configService.get('key', { infer: true }) ?? undefined,
              cert:
                this.configService.get('cert', { infer: true }) ?? undefined,
            }
          : undefined,
      },
    } as TypeOrmModuleOptions;
  }
}
