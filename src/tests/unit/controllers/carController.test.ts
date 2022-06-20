import * as sinon from 'sinon';
import CarController from '../../../controllers/Car';
import CarService from '../../../services/Car';
import { dbCars, validCar } from '../../mock/carMock';

describe('Testa camada de Controller de Car', async () => {
  const carService = new CarService();
  const carController = new CarController(carService);

  const request = { body: {}, params: {} } as any;

  const response = {
    status: sinon.stub().returns({ json: sinon.spy() }),
    json: sinon.spy(),
  } as any;

  before(() => {
    sinon.stub(carService, 'create')
    sinon.stub(carService, 'read')
    sinon.stub(carService, 'readOne')
    sinon.stub(carService, 'update')
    sinon.stub(carService, 'delete')
  });

  after(()=>{
    (carService.create as sinon.SinonStub).restore();
    (carService.read as sinon.SinonStub).restore();
    (carService.readOne as sinon.SinonStub).restore();
    (carService.update as sinon.SinonStub).restore();
    (carService.delete as sinon.SinonStub).restore();
  })

  it('Se a função create funciona corretamente', async () => {
    request.body = validCar;
    (carService.create as sinon.SinonStub).resolves(validCar);

    await carController.create(request, response);

    sinon.assert.calledWith(response.status, 201);
    sinon.assert.calledWith(response.status(201).json, validCar);
  });


  it('Se a função read funciona corretamente', async () => {
    request.body = dbCars;
    (carService.read as sinon.SinonStub).resolves(dbCars);

    await carController.read(request, response);

    sinon.assert.calledWith(response.status, 200);
    sinon.assert.calledWith(response.status(200).json, dbCars);
  });

  it('Se a função readOne funciona corretamente"', async () => {
    request.body = dbCars;
    request.params = { id: '123f7136a3a723e56bd05bb1'};
    (carService.readOne as sinon.SinonStub).resolves(dbCars[0]);

    await carController.readOne(request, response);

    sinon.assert.calledWith(response.status, 200);
    sinon.assert.calledWith(response.status(200).json, dbCars[0]);
  });

  it('Se a função update funciona corretamente', async () => {
    request.body = dbCars;
    request.params = { id: '507f191e810c19729de860ea'};
    (carService.update as sinon.SinonStub).resolves(dbCars[1]);

    await carController.update(request, response);

    sinon.assert.calledWith(response.status, 200);
    sinon.assert.calledWith(response.status(200).json, dbCars[1]);
  });

  it('Se a função delete funciona corretamente', async () => {
    request.body = dbCars;
    request.params = { id: '507f191e810c19729de860ea'};
    (carService.delete as sinon.SinonStub).resolves(dbCars[1]);

    await carController.delete(request, response);

    sinon.assert.calledWith(response.status, 204);
    sinon.assert.calledWith(response.status(204).json, dbCars[1]);
  });
});
