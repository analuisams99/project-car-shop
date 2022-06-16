import { Request, Response } from 'express';
import Service from '../services';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id must have 24 hexadecimal characters',
  badRequest = 'Bad request',
}

export default abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) { }

  abstract create(
    req: RequestWithBody<T>, res: Response<T | ResponseError>
  ): Promise<Response<T>>;

  abstract read(
    req: Request, res: Response<T[] | ResponseError>
  ): Promise<Response<T[]>>;

  abstract readOne(
    req: Request<{ id: string }>, res: Response<T | ResponseError>
  ): Promise<Response<T>>;

  abstract update(
    req: Request<{ id: string }>, res: Response<T | ResponseError>
  ): Promise<Response<T>>;

  abstract delete(
    req: Request<{ id: string }>, res: Response<T | ResponseError>
  ): Promise<Response<T | null>>;
}