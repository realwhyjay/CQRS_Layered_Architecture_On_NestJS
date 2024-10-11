import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExceptionBase } from '@common/exceptions';
import { RequestContextService } from '../context/AppRequestContext';
import { ApiErrorResponse } from '@src/common/api/api-error.response';

export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(ExceptionInterceptor.name);

  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<ExceptionBase> {
    return next.handle().pipe(
      catchError((error) => {
        // Logging for debugging purposes
        if (error.status >= 400 && error.status < 500) {
          this.logger.debug(
            `[${RequestContextService.getRequestId()}] ${error.message}`,
          );

          const isClassValidatorError =
            Array.isArray(error?.response?.message) &&
            typeof error?.response?.error === 'string' &&
            error.status === 400;

          // Transforming class-validator errors to a different format
          if (isClassValidatorError) {
            error = new BadRequestException(
              new ApiErrorResponse({
                statusCode: error.status,
                message: 'VALIDATION_ERROR',
                error: error?.response?.error,
                descriptions: error?.response?.message,
                correlationId: RequestContextService.getRequestId(),
              }),
            );
          } else {
            error = new BadRequestException(
              new ApiErrorResponse({
                statusCode: error.status,
                message: error?.code,
                error: error?.response?.error,
                descriptions: error?.response?.message,
                correlationId: RequestContextService.getRequestId(),
              }),
            );
          }
        } else if (error.status == 500) {
          this.logger.debug(
            `[${RequestContextService.getRequestId()} - 500] ${error.message}`,
          );
          error = new InternalServerErrorException();
        }

        // Adding request ID to error message
        if (!error.correlationId) {
          error.correlationId = RequestContextService.getRequestId();
        }

        if (error.response) {
          error.response.correlationId = error.correlationId;
        }

        return throwError(() => error);
      }),
    );
  }
}
