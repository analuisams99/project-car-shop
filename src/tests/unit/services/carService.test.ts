import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { dbCars, validCar, wrongCar } from '../../mock/carMock';

const carModel = new CarModel();
const carService = new CarService(carModel);

const id = "123f7136a3a723e56bd05bb1";

describe('Testa camada de Service de Car', () => { 
  beforeEach(() => {
    sinon
      .stub(carModel, 'create')
      .resolves(validCar);
    sinon
      .stub(carModel, 'read')
      .resolves(dbCars);
    sinon
      .stub(carModel, 'readOne')
      .resolves(dbCars[0]);
    sinon
      .stub(carModel, 'update')
      .resolves(dbCars[0]);
    sinon
      .stub(carModel, 'delete')
      .resolves(dbCars[1]);
  })

  afterEach(() => {
    (carModel.create as sinon.SinonStub).restore();
    (carModel.read as sinon.SinonStub).restore();
    (carModel.readOne as sinon.SinonStub).restore();
    (carModel.update as sinon.SinonStub).restore();
    (carModel.delete as sinon.SinonStub).restore();
  })
    it("Se a função create funciona corretamente e retorna um objeto esperado", async () => {
      const created = await carService.create(validCar);
      expect(created).to.be.a('object');
      expect(created).to.be.deep.equal(validCar);
    });

    it('Se a função retorna um erro, caso tente criar um carro inválido', async () => {
      const created = await carService.create(wrongCar as unknown as any);
  
      expect(created).to.be.an('object');
      expect(created).to.have.own.property('error');
    })

    it("Se a função read funciona corretamente e retorna um array de objetos esperado", async () => {
      const cars = await carService.read();
      expect(cars).to.be.a('array');
      expect(cars).to.be.deep.equal(dbCars);
    });

    it("Se a função readOne funciona corretamente e retorna um objeto esperado", async () => {
      const car = await carService.readOne(id);
      expect(car).to.be.a('object');
      expect(car).to.be.deep.equal(dbCars[0]);
    });

    it("Se a função update funciona corretamente e retorna um objeto esperado", async () => {
      const updated = await carService.update(id, validCar);
      expect(updated).to.be.a('object');
      expect(updated).to.be.deep.equal(dbCars[0]);
  });

    it("Se a função delete funciona corretamente", async () => {
      const deleted = await carService.update(id, validCar);
      expect(deleted).to.be.a('object');
      expect(deleted).to.be.deep.equal(dbCars[0]);
    });
});
