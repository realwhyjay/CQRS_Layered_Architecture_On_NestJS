import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiTagsSet, routesV1 } from '@config/app.routes';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { IdResponse } from '@common/api/id.response.dto';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequestDto } from './dtos/create-user.request.dto';
import { CreateUserFailException } from './errors/create-user.error';
import { ResponseBase } from '@src/common/api/response/response';
import { ResponseMessage } from '@src/common/constants/responseMessage';

@Controller(routesV1.version)
@ApiTags(ApiTagsSet.user)
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create a user' })
  @Post(routesV1.user.create)
  async create(@Body() body: CreateUserRequestDto) {
    const command = new CreateUserCommand(body);
    const result: Result<IdResponse, CreateUserFailException> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (id: IdResponse) =>
        ResponseBase.OK_WITH_DATA(ResponseMessage.SUCCESS.USER.CREATE, id),
      Err: (error: Error) => {
        if (error instanceof CreateUserFailException) {
          throw new InternalServerErrorException(error.message);
        } else {
          throw error;
        }
      },
    });
  }
}
