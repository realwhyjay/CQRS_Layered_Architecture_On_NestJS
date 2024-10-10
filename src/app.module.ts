import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RequestContextModule } from 'nestjs-request-context';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ExceptionInterceptor } from '@common/application/interceptors/exception.interceptor';
import { UserModule } from './modules/user/user.module';
import { ContextInterceptor } from './common/application/context/ContextInterceptor';
import { TypeOrmConfigService } from './common/database/typeorm.config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options?: DataSourceOptions) => {
        return new DataSource(options as DataSourceOptions).initialize();
      },
    }),
    RequestContextModule,
    EventEmitterModule.forRoot(),
    CqrsModule,
    UserModule,
  ],
  providers: [...interceptors],
})
export class AppModule {}
