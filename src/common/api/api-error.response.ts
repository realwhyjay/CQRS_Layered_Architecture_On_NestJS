import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorResponse {
  readonly statusCode: number;

  readonly message: string;

  readonly error?: string;

  @ApiProperty({ example: 'YevPQs' })
  readonly correlationId: string;

  @ApiProperty({
    example: ['incorrect email'],
    description: 'Optional list of sub-errors',
    nullable: true,
    required: false,
  })
  readonly descriptions: string[] | string;

  constructor(body: ApiErrorResponse) {
    this.statusCode = body.statusCode;
    this.message = body.message;
    this.error = body.error;
    this.correlationId = body.correlationId;
    this.descriptions = body.descriptions;
  }
}
