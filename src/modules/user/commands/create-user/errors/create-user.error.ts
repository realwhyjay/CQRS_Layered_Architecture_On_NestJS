import { ExceptionBase } from '@src/common/exceptions';
import { CREATE_USER_FAIL } from './create-user.error.code';
import { ResponseMessage } from '@src/common/constants/responseMessage';

export class CreateUserFailException extends ExceptionBase {
  readonly code = CREATE_USER_FAIL;
  static readonly message = ResponseMessage.ERROR.USER.CREATE;

  constructor(message = CreateUserFailException.message) {
    super(CreateUserFailException.name, undefined, message, 500);
  }
}
