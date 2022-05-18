const { Pokemon, Type, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name and id', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({id:889})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if id is not valid', (done) => {
        Pokemon.create({name: 'Pikachu'})
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
      it('should work when its a valid name and a valid id', () => {
        Pokemon.create({ name: 'Pikachu', id:889 });
      });
    });
  });
});

describe('Type model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Type.sync({ force: true }));
    describe('id', () => {
      it('should throw an error if id is not valid', (done) => {
        Pokemon.create({name: 'Water'})
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
      it('should work when its a valid id', () => {
        Pokemon.create({ name: 'Water', id:1 });
      });
    });
  });
});