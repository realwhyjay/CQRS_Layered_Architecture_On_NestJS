import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@common/api/response.base';

export class UserResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'joh-doe@gmail.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty({
    example: 'jeffrey',
    description: 'user name',
  })
  name: string;
}
