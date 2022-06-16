import { ZodError } from 'zod';
import { Model } from '../interfaces/ModelInterface';

export interface ServiceError {
  error: ZodError;
}

export default abstract class Service<T> {
  constructor(protected model: Model<T>) { }

  async create(obj: T): Promise<T | null | ServiceError> {
    return this.model.create(obj);
  }

  async read(): Promise<T[]> {
    return this.model.read();
  }

  async readOne(id: string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  async update(id: string, data: T): Promise<T | null | ServiceError> {
    return this.model.update(id, data);
  }

  async delete(id: string): Promise<T | null | ServiceError> {
    return this.model.delete(id);
  }
}