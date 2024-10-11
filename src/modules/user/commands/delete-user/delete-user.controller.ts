import {
  Controller,
  Delete,
  HttpStatus,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { ApiTagsSet, routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { DeleteUserCommand } from './delete-user.command';
import { UserDeleteFailException } from './errors/delete-user.error';
import { IdResponse } from '@src/common/api/id.response.dto';

import { ResponseMessage } from '@src/common/constants/responseMessage';
import { ResponseBase } from '@src/common/api/response/response';

@Controller(routesV1.version)
@ApiTags(ApiTagsSet.user)
export class DeleteUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({
    summary: 'User Delete',
    description: 'user id를 입력받아 해당 유저를 탈퇴처리한다',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Delete(routesV1.user.delete)
  async deleteUser(@Param('id') userId: number): Promise<any> {
    const data = {
      userId,
    };
    const command = new DeleteUserCommand(data);
    const result: Result<boolean, Error> = await this.commandBus.execute(
      command,
    );

    return match(result, {
      Ok: () => ResponseBase.OK_WITH(ResponseMessage.SUCCESS.USER.DELETE),
      Err: (error: Error) => {
        if (error instanceof UserDeleteFailException) {
          throw new InternalServerErrorException(error.message);
        } else {
          throw error;
        }
      },
    });
  }
}
