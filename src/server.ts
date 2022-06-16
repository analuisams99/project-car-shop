import CarController from './controllers/Car';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/Router';
import App from './app';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

export default server;
