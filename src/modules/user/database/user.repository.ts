import { RepositoryPort } from '@src/common/database/repository';
import { UserEntity } from '@src/common/database/entities';
import { Result } from 'oxide.ts';
import { UserIsNotExistException } from '../errors/user-error';

export interface UserRepository extends RepositoryPort<UserEntity> {
  findOneByEmail(
    email: string,
  ): Promise<Result<UserEntity, UserIsNotExistException>>;
}
