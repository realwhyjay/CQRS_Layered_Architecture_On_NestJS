import { ExceptionBase } from '@src/common/exceptions';
import { USER_SAVE_FAIL } from './create-user.error.code';

export class UserSaveFailException extends ExceptionBase {
  readonly code = USER_SAVE_FAIL;
  static readonly message = 'user save fail in database';

  constructor(message = UserSaveFailException.message) {
    super(UserSaveFailException.name, undefined, message, 500);
  }
}
