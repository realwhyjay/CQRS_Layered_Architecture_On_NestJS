import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from '@modules/user/database/user.repository';
import { DeleteUserCommand } from './delete-user.command';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserDeleteFailException } from './errors/delete-user.error';
import { UserIsNotExistException } from '../../errors/user-error';

@CommandHandler(DeleteUserCommand)
export class DeleteUserService implements ICommandHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    @Inject(Logger)
    private readonly logger = new Logger(DeleteUserService.name),
  ) {}

  readonly Exceptions = [UserDeleteFailException, UserIsNotExistException];

  async execute(
    command: DeleteUserCommand,
  ): Promise<Result<boolean, InstanceType<(typeof this.Exceptions)[number]>>> {
    try {
      const result = await this.userRepo.softDeleteById(command.userId);

      if (!result) {
        return Err(new UserIsNotExistException());
      }

      return Ok(true);
    } catch (err: any) {
      this.logger.error(`User delete fail ${err.message}`, err.stack);
      return Err(new UserDeleteFailException());
    }
  }
}
