import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetUserDetailRequestDto {
  @ApiProperty({
    example: 1,
    description: 'User Id',
  })
  @Type(() => Number)
  @IsNumber()
  readonly id: number;
}
