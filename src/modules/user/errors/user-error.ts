import { ExceptionBase } from '@src/common/exceptions';
import { USER_IS_NOT_EXIST } from './user-error.code';

export class UserIsNotExistException extends ExceptionBase {
  readonly code = USER_IS_NOT_EXIST;
  static readonly message = 'user is not exist error';

  constructor(message = UserIsNotExistException.message) {
    super(UserIsNotExistException.name, undefined, message, 400);
  }
}
