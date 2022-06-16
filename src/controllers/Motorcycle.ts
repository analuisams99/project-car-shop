import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleService from '../services/Motorcycle';

export default class MotorcycleController extends Controller<Motorcycle> {
  private $route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const response = await this.service.create(body);
      if (!response) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in response) return res.status(400).json(response);
      return res.status(201).json(response);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Motorcycle[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const response = await this.service.read();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.requiredId });
      }
      const response = await this.service.readOne(id);
      if (!response) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      if ('error' in response) return res.status(404).json(response);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | null | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      const { body } = req;
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.requiredId });
      }
      const response = await this.service.update(id, body);
      if (!response) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      if ('error' in response) return res.status(400).json(response);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | null | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.requiredId });
      }
      const response = await this.service.delete(id);
      return response
        ? res.status(204).json(response)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
