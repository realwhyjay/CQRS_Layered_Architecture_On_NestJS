import { RepositoryPort } from '@src/common/database/repository';
import { UserEntity } from '@src/common/database/entities';
import { UserIsNotExistException } from '../commands/create-user/errors/create-user.error';
import { Result } from 'oxide.ts';

export interface UserRepository extends RepositoryPort<UserEntity> {
  findOneByEmail(
    email: string,
  ): Promise<Result<UserEntity, UserIsNotExistException>>;
}
