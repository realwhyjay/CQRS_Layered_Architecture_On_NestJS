import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@src/common/database/entities';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({ example: 'Jeffrey', description: 'first name' })
  @MaxLength(50)
  @MinLength(1)
  @IsString()
  readonly firstName: string;

  @ApiProperty({ example: 'Kim', description: 'last name' })
  @MaxLength(50)
  @MinLength(1)
  @IsString()
  readonly lastName: string;

  @ApiProperty({ example: '01012345678', description: 'user phone number' })
  @MaxLength(11)
  @MinLength(11)
  @IsString()
  readonly phone: string;

  @ApiProperty({
    example: 'john@gmail.com',
    description: 'User email address',
  })
  @MaxLength(320)
  @MinLength(5)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'M',
    description: 'user gender',
  })
  @MaxLength(320)
  @MinLength(1)
  @IsString()
  readonly gender: Gender;
}
