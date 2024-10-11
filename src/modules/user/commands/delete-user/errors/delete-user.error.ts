import { ExceptionBase } from '@src/common/exceptions';
import { USER_DELETE_FAIL } from './delete-user.error.code';

export class UserDeleteFailException extends ExceptionBase {
  readonly code = USER_DELETE_FAIL;
  static readonly message = 'user save fail in database';

  constructor(message = UserDeleteFailException.message) {
    super(UserDeleteFailException.name, undefined, message, 500);
  }
}
