import { ExceptionBase } from '@src/common/exceptions';
import { USER_DELETE_FAIL } from './delete-user.error.code';
import { ResponseMessage } from '@src/common/constants/responseMessage';

export class UserDeleteFailException extends ExceptionBase {
  readonly code = USER_DELETE_FAIL;
  static readonly message = ResponseMessage.ERROR.USER.DELETE;

  constructor(message = UserDeleteFailException.message) {
    super(UserDeleteFailException.name, undefined, message, 500);
  }
}
