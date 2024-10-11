import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@src/common/database/entities';

export class GetUserDetailResponseDto {
  constructor(props: UserEntity) {
    this.id = props.id;
    this.email = props.email;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
  }
  @ApiProperty({
    example: 1,
    description: 'User id',
  })
  id: number;

  @ApiProperty({
    example: 'jeffrey',
    description: 'user first name',
  })
  firstName: string;

  @ApiProperty({
    example: 'Kim',
    description: 'user last name',
  })
  lastName: string;

  @ApiProperty({
    example: 'joh-doe@gmail.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty({
    example: new Date(),
    description: 'User Created At',
  })
  createdAt: Date;
}
