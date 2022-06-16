import Service, { ServiceError } from '.';
import { 
  Motorcycle, motorcycleZodSchema,
} from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/Motorcycle';

export default class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) { 
    super(model);
  }

  create = async (data: Motorcycle):
  Promise<Motorcycle | ServiceError | null> => {
    const response = motorcycleZodSchema.safeParse(data);
    if (!response.success) {
      return { error: response.error };
    }
    return this.model.create(data);
  };

  update = async (id: string, data: Motorcycle): 
  Promise<Motorcycle | ServiceError | null> => {
    const response = motorcycleZodSchema.safeParse(data);

    if (!response.success) {
      return { error: response.error };
    }
    return this.model.update(id, data);
  };
}