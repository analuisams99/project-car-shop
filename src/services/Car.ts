import Service, { ServiceError } from '.';
import { Car, carZodSchema } from '../interfaces/CarInterface';
import CarModel from '../models/Car';

export default class CarService extends Service<Car> {
  constructor(model = new CarModel()) { 
    super(model);
  }

  create = async (data: Car): Promise<Car | ServiceError | null> => {
    const response = carZodSchema.safeParse(data);
    if (!response.success) {
      return { error: response.error };
    }
    return this.model.create(data);
  };

  update = async (id: string, data: Car): 
  Promise<Car | ServiceError | null> => {
    const response = carZodSchema.safeParse(data);

    if (!response.success) {
      return { error: response.error };
    }
    return this.model.update(id, data);
  };
}