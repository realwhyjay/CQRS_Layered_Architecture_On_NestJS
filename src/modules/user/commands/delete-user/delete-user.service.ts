import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from '@modules/user/database/user.repository';
import { IdResponse } from '@common/api/id.response.dto';
import { DeleteUserCommand } from './delete-user.command';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserDeleteFailException } from './errors/delete-user.error';

@CommandHandler(DeleteUserCommand)
export class DeleteUserService implements ICommandHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    @Inject(Logger)
    private readonly logger = new Logger(DeleteUserService.name),
  ) {}

  async execute(
    command: DeleteUserCommand,
  ): Promise<Result<boolean, UserDeleteFailException>> {
    try {
      const result = await this.userRepo.deleteById(command.userId);

      return Ok(result);
    } catch (err: any) {
      this.logger.error(`User delete fail ${err.message}`, err.stack);
      return Err(new UserDeleteFailException());
    }
  }
}
