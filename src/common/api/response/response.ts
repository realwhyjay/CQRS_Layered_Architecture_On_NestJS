import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import statusCode, { ResponseStatus } from './statusCode';

export class ResponseBase<T> {
  @Exclude() private readonly statusCode: ResponseStatus;
  @Exclude() private readonly message: string;
  @Exclude() private readonly data: T;

  private constructor(status: ResponseStatus, message: string, data?: T) {
    this.statusCode = status;
    this.message = message;

    if (data) {
      this.data = data;
    }
  }

  static OK(): ResponseBase<string> {
    return new ResponseBase<string>(statusCode.OK, '', '');
  }

  static OK_WITH(message: string): ResponseBase<string> {
    return new ResponseBase<string>(statusCode.OK, message);
  }

  static OK_WITH_DATA<T>(message: string, data: T): ResponseBase<T> {
    return new ResponseBase<T>(statusCode.OK, message, data);
  }

  static CREATED(): ResponseBase<string> {
    return new ResponseBase<string>(statusCode.CREATED, '', '');
  }

  static CREATED_WITH(message: string): ResponseBase<string> {
    return new ResponseBase<string>(statusCode.CREATED, message);
  }

  static CREATED_WITH_DATA<T>(message: string, data: T): ResponseBase<T> {
    return new ResponseBase<T>(statusCode.CREATED, message, data);
  }

  static ACCEPTED(): ResponseBase<string> {
    return new ResponseBase<string>(statusCode.ACCEPTED, '', '');
  }

  static ACCEPTED_WITH(message: string): ResponseBase<string> {
    return new ResponseBase<string>(statusCode.ACCEPTED, message);
  }

  static ACCEPTED_WITH_DATA<T>(message: string, data: T): ResponseBase<T> {
    return new ResponseBase<T>(statusCode.ACCEPTED, message, data);
  }

  static NO_CONTENT(): ResponseBase<string> {
    return new ResponseBase<string>(statusCode.NO_CONTENT, '', '');
  }

  @ApiProperty({
    title: '응답 코드',
    example: '200 | 201 | 500',
  })
  @Expose()
  get getStatus(): ResponseStatus {
    return this.statusCode;
  }

  @ApiProperty({
    title: '응답 메시지',
    example: `'' | 서버 에러가 발생했습니다. | 입력 값`,
  })
  @Expose()
  get getMessage(): string {
    return this.message;
  }

  @ApiProperty({
    title: '응답 데이터',
    example: `'' | {}`,
  })
  @Expose()
  get getData(): T {
    return this.data;
  }
}
