import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTagsSet, routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { DeleteUserCommand } from './delete-user.command';
import { UserDeleteFailException } from './errors/delete-user.error';
import { IdResponse } from '@src/common/api/id.response.dto';

@Controller(routesV1.version)
@ApiTags(ApiTagsSet.user)
export class DeleteUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'delete a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Delete(routesV1.user.delete)
  async delete(@Param('id') userId: number): Promise<any> {
    const command = new DeleteUserCommand({ userId });
    const result: Result<IdResponse, UserDeleteFailException> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (id: IdResponse) => id,
      Err: (error: Error) => {
        if (error instanceof UserDeleteFailException) {
          throw new InternalServerErrorException(error.message);
        } else {
          throw error;
        }
      },
    });
    return result;
  }
}
