import { ExceptionBase } from '@src/common/exceptions';
import { GET_USER_DETAIL_FAIL } from './get-user-detail.error.code';
import { ResponseMessage } from '@src/common/constants/responseMessage';

export class GetUserDetailFailException extends ExceptionBase {
  readonly code = GET_USER_DETAIL_FAIL;
  static readonly message = ResponseMessage.ERROR.USER.GET.DETAIL;

  constructor(message = GetUserDetailFailException.message) {
    super(GetUserDetailFailException.name, undefined, message, 500);
  }
}
