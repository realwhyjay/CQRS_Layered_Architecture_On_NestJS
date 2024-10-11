import { Logger, Module, Provider } from '@nestjs/common';
import { UserRepositoryImpl } from './database/user.repository.impl';
import { CreateUserController } from './commands/create-user/create-user.controller';
import { GetUserDetailController } from './queries/get-user-detail/get-user-detail.controller';
import { CreateUserService } from './commands/create-user/create-user.service';
import { GetUserDetailQueryHandler } from './queries/get-user-detail/get-user-detail.query-handler';
import { CqrsModule } from '@nestjs/cqrs';
import { USER_REPOSITORY } from './user.di-tokens';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entityList } from '@src/common/database/entities';
import { DeleteUserController } from './commands/delete-user/delete-user.controller';

const controllers = [
  CreateUserController,
  GetUserDetailController,
  DeleteUserController,
];

const commandHandlers: Provider[] = [CreateUserService];

const queryHandlers: Provider[] = [GetUserDetailQueryHandler];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
];
@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(entityList)],
  controllers: [...controllers],
  providers: [Logger, ...repositories, ...commandHandlers, ...queryHandlers],
})
export class UserModule {}
