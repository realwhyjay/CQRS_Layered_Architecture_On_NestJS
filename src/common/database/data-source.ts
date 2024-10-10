import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { entityList } from './entities';

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  dropSchema: true,
  keepConnectionAlive: true,
  connectTimeout: process.env.DB_CONNECT_TIMEOUT,
  logging: process.env.NODE_ENV !== 'production',
  entities: entityList,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations/',
    // subscribersDir: 'subscriber',
  },
  extra: {
    // based on https://node-postgres.com/api/pool
    // max connection pool size
    max: process.env.DB_MAX_CONNECTIONS
      ? parseInt(process.env.DB_MAX_CONNECTIONS, 10)
      : 100,
    ssl:
      process.env.DB_SSL_ENABLED === 'true'
        ? {
            rejectUnauthorized: process.env.DB_REJECT_UNAUTHORIZED === 'true',
            ca: process.env.DB_CA ?? undefined,
            key: process.env.DB_KEY ?? undefined,
            cert: process.env.DB_CERT ?? undefined,
          }
        : undefined,
  },
} as DataSourceOptions);
