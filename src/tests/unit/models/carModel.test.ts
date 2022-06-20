import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarModel, { CarDocument } from '../../../models/Car';
import { validCar } from '../../mock/carMock';

const spy = Sinon.spy();

const modelMock = {
  create: spy,
  find: spy,
  findOne: spy,
  findOneAndUpdate: spy,
  findOneAndRemove: spy,
} as unknown as Model<CarDocument>

const carModel = new CarModel(modelMock);
const id = "123f7136a3a723e56bd05bb1";

describe('Testa camada de Model de Car', () => {
  describe('chama a função create do model', () => {
    it("Se ocorre corretamente", async () => {
      carModel.create(validCar);
      expect(spy.called).to.be.equal(true)
    });
  });

  describe('chama a função read do model', () => {
    it("Se ocorre corretamente", async () => {
      carModel.read();
      expect(spy.called).to.be.equal(true)
    });
  });

  describe('chama a função readOne do model', () => {
    it("Se ocorre corretamente", async () => {
      carModel.readOne(id);
      expect(spy.called).to.be.equal(true)
    });
  });

  describe('chama a função update do model', () => {
    it("Se ocorre corretamente", async () => {
      carModel.update(id, validCar);
      expect(spy.called).to.be.equal(true)
    });
  });

  describe('chama a função delete do model', () => {
    it("Se ocorre corretamente", async () => {
      carModel.delete(id);
      expect(spy.called).to.be.equal(true)
    });
  });
});
