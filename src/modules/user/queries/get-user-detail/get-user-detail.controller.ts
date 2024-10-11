import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Result, match } from 'oxide.ts';
import { ApiTagsSet, routesV1 } from '@config/app.routes';

import { GetUserDetailRequestDto } from './dtos/get-user-detail.request.dto';
import { GetUserDetailQuery } from './get-user-detail.query-handler';
import { GetUserDetailResponseDto } from './dtos/get-user-detail.response.dto';
import { ResponseBase } from '@src/common/api/response/response';
import { ResponseMessage } from '@src/common/constants/responseMessage';

import { GetUserDetailFailException } from './errors/get-user-detail.error';

@Controller(routesV1.version)
@ApiTags(ApiTagsSet.user)
export class GetUserDetailController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.user.get.detail)
  @ApiOperation({
    summary: 'Get User Detail',
    description: `user의 Id를 받아 user를 조회한다`,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUserDetailResponseDto,
  })
  async getUserDetail(
    @Query() queryParams: GetUserDetailRequestDto,
  ): Promise<ResponseBase<GetUserDetailResponseDto>> {
    const query = new GetUserDetailQuery({
      ...queryParams,
    });

    const result: Result<GetUserDetailResponseDto, Error> =
      await this.queryBus.execute(query);

    return match(result, {
      Ok: (user: GetUserDetailResponseDto) =>
        ResponseBase.OK_WITH_DATA(
          ResponseMessage.USER.GET.DETAIL.SUCCESS,
          user,
        ),
      Err: (error: Error) => {
        if (error instanceof GetUserDetailFailException) {
          throw new InternalServerErrorException(error.message);
        } else {
          throw error;
        }
      },
    });
  }
}
