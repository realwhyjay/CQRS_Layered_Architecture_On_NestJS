import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@src/common/database/entities';
import { Repository } from 'typeorm';
import { UserIsNotExistException } from '../../errors/user-error';
import { GetUserDetailResponseDto } from './dtos/get-user-detail.response.dto';
import { GetUserDetailFailException } from './errors/get-user-detail.error';

export class GetUserDetailQuery {
  readonly id: number;

  constructor(props: GetUserDetailQuery) {
    this.id = props.id;
  }
}

/**
 * 해당 handler는 비즈니스 로직, 퍼시스턴스 로직을 같이 작성해도 무방(단순 조회이므로 불필요한 계층 이동을 방지를 위함)
 * 하지만 비즈니스 로직이 복잡해지고 처리할게 많다면 계층 분리해도 됨
 */
@QueryHandler(GetUserDetailQuery)
export class GetUserDetailQueryHandler implements IQueryHandler {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async execute(
    query: GetUserDetailQuery,
  ): Promise<Result<GetUserDetailResponseDto, Error>> {
    try {
      const user = await this.userRepo.findOne({
        where: {
          id: query.id,
        },
      });

      if (!user) {
        throw new UserIsNotExistException();
      }

      return Ok(new GetUserDetailResponseDto(user));
    } catch (error: any) {
      return Err(new GetUserDetailFailException(error.message));
    }
  }
}
