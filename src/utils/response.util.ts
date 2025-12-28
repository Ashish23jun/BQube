import { Response } from 'express';

interface SuccessResponse<T> {
  status: 'success';
  message?: string;
  data?: T;
}

interface ErrorResponse {
  status: 'error';
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  stack?: string;
}

export class ApiResponse {
  static success<T>(
    res: Response,
    data?: T,
    message?: string,
    statusCode = 200
  ): Response {
    const response: SuccessResponse<T> = {
      status: 'success',
    };

    if (message) response.message = message;
    if (data !== undefined) response.data = data;

    return res.status(statusCode).json(response);
  }

  static created<T>(
    res: Response,
    data?: T,
    message = 'Resource created successfully'
  ): Response {
    return this.success(res, data, message, 201);
  }

  static error(
    res: Response,
    message: string,
    statusCode = 500,
    errors?: Array<{ field: string; message: string }>,
    stack?: string
  ): Response {
    const response: ErrorResponse = {
      status: 'error',
      message,
    };

    if (errors) response.errors = errors;
    if (stack && process.env.NODE_ENV === 'development') response.stack = stack;

    return res.status(statusCode).json(response);
  }

  static badRequest(
    res: Response,
    message = 'Bad request',
    errors?: Array<{ field: string; message: string }>
  ): Response {
    return this.error(res, message, 400, errors);
  }

  static unauthorized(res: Response, message = 'Unauthorized'): Response {
    return this.error(res, message, 401);
  }

  static forbidden(res: Response, message = 'Forbidden'): Response {
    return this.error(res, message, 403);
  }

  static notFound(res: Response, message = 'Resource not found'): Response {
    return this.error(res, message, 404);
  }

  static conflict(
    res: Response,
    message = 'Resource already exists'
  ): Response {
    return this.error(res, message, 409);
  }

  static internalError(
    res: Response,
    message = 'Internal server error',
    stack?: string
  ): Response {
    return this.error(res, message, 500, undefined, stack);
  }
}
