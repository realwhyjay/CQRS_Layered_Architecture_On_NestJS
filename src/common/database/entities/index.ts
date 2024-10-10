import { UserEntity } from './user.entity';

export * from './user.entity';

export const entityList = [UserEntity];
export type Entitys = InstanceType<(typeof entityList)[number]>;
