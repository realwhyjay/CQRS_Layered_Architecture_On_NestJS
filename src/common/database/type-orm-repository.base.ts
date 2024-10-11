import { Repository } from 'typeorm';
import { LoggerPort } from '../ports/logger.port';
import { Paginated, PaginatedQueryParams, RepositoryPort } from './repository';
import { Entitys } from './entities';

export abstract class TypeOrmRepositoryBase<Entity>
  implements RepositoryPort<Entity>
{
  protected constructor(
    protected readonly repository: Repository<any>,
    protected readonly logger: LoggerPort,
  ) {}

  async findOneById(id: number): Promise<Entity> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<Entity[]> {
    return await this.repository.find();
  }

  async findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<Entity>> {
    let field = params.orderBy.field;

    if (field === true) {
      field = '1';
    }

    const result = await this.repository
      .createQueryBuilder()
      .offset(params.offset)
      .orderBy(field, params.orderBy.param as 'ASC' | 'DESC')
      .limit(params.limit)
      .getMany();

    return new Paginated({
      data: result,
      count: result.length,
      limit: params.limit,
      page: params.page,
    });
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.repository.delete({ id });

    return result.affected === 0;
  }

  async softDeleteById(id: number): Promise<boolean> {
    const result = await this.repository.softRemove({ id });
    return result.affected !== 0;
  }

  async insert(entity: Entitys): Promise<number> {
    const result = await this.repository.insert(entity);

    return result.identifiers[0]['id'];
  }
}
