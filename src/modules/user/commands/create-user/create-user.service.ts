import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from '@modules/user/database/user.repository';
import { UserEntity } from '@src/common/database/entities';
import { IdResponse } from '@common/api/id.response.dto';
import { CreateUserCommand } from './create-user.command';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserSaveFailException } from './errors/create-user.error';
import { isInstanceOfCustomExceptions } from '@src/common/exceptions';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    @Inject(Logger)
    private readonly logger = new Logger(CreateUserService.name),
  ) {}

  readonly Exceptions = [UserSaveFailException];

  private ValidateUserEntity({
    firstName,
    lastName,
    phone,
    email,
  }: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }) {
    const user = new UserEntity();

    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.email = email;

    return user;
  }

  async execute(
    command: CreateUserCommand,
  ): Promise<
    Result<IdResponse, InstanceType<(typeof this.Exceptions)[number]>>
  > {
    const userEntity = this.ValidateUserEntity(command);

    try {
      const id = await this.userRepo.insert(userEntity);

      return Ok(new IdResponse(id));
    } catch (error: any) {
      this.logger.error(`User save fail ${error.message}`, error.stack);

      if (isInstanceOfCustomExceptions(error, this.Exceptions)) {
        return Err(error);
      }

      return Err(new UserSaveFailException());
    }
  }
}
