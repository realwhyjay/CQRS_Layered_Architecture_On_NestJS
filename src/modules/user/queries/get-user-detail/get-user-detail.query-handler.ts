import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { PaginatedParams, PaginatedQueryBase } from '@src/common/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@src/common/database/entities';
import { Repository } from 'typeorm';

export class FindUsersQuery extends PaginatedQueryBase {
  readonly name?: string;
  readonly email?: string;
  readonly gender?: string;

  constructor(props: PaginatedParams<FindUsersQuery>) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.gender = props.gender;
  }
}

/**
 * 해당 handler는 비즈니스 로직, 퍼시스턴스 로직을 같이 작성해도 무방(단순 조회이므로 불필요한 계층 이동을 방지를 위함)
 * 하지만 비즈니스 로직이 복잡해지고 처리할게 많다면 계층 분리해도 됨
 */
@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async execute(query: FindUsersQuery): Promise<Result<UserEntity, Error>> {
    const result = await this.userRepo.find({
      where: {
        email: query.email ? query.email : undefined,
        firstName: query.name ? query.name : undefined,
      },
    });

    return Ok(result[0]);
  }
}
