import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiTagsSet, routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { IdResponse } from '@common/api/id.response.dto';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequestDto } from './dtos/create-user.request.dto';
import { UserSaveFailException } from './errors/create-user.error';

@Controller(routesV1.version)
@ApiTags(ApiTagsSet.user)
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: IdResponse,
  })
  @Post(routesV1.user.root)
  async create(
    @Body() body: CreateUserRequestDto,
  ): Promise<IdResponse | Error> {
    const command = new CreateUserCommand(body);
    console.log(command);
    const result: Result<IdResponse, UserSaveFailException> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (id: IdResponse) => id,
      Err: (error: Error) => {
        if (error instanceof UserSaveFailException) {
          throw new InternalServerErrorException(error.message);
        } else {
          throw error;
        }
      },
    });
  }
}
