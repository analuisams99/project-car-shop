import CarController from './controllers/Car';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/Router';
import App from './app';
import MotorcycleController from './controllers/Motorcycle';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

const carController = new CarController();
const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

const motorcycleController = new MotorcycleController();
const motorcycleRouter = new CustomRouter<Motorcycle>();
motorcycleRouter.addRoute(motorcycleController);

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

export default server;
