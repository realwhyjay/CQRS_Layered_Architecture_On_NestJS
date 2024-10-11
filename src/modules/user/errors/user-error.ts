import { ExceptionBase } from '@src/common/exceptions';
import { USER_IS_NOT_EXIST } from './user-error.code';
import { ResponseMessage } from '@src/common/constants/responseMessage';

export class UserIsNotExistException extends ExceptionBase {
  readonly code = USER_IS_NOT_EXIST;
  static readonly message = ResponseMessage.ERROR.USER.COMMON.NOT_EXIST;

  constructor(message = UserIsNotExistException.message) {
    super(UserIsNotExistException.name, undefined, message, 400);
  }
}
