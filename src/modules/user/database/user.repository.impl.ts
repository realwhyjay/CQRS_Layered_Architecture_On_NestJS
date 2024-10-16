import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ok, Err, Result } from 'oxide.ts';
import { TypeOrmRepositoryBase } from '@src/common/database/type-orm-repository.base';
import { UserEntity } from '@src/common/database/entities';
import { UserRepository } from './user.repository';
import { UserIsNotExistException } from '../errors/user-error';

@Injectable()
export class UserRepositoryImpl
  extends TypeOrmRepositoryBase<UserEntity>
  implements UserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {
    super(userRepo, new Logger(UserRepositoryImpl.name));
  }

  async findOneByEmail(
    email: string,
  ): Promise<Result<UserEntity, UserIsNotExistException>> {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return Ok(user);
    } else {
      return Err(new UserIsNotExistException());
    }
  }
}
