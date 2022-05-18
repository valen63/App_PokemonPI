/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, Type, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  id: 1009,
  life: 20,
  strong: 10,
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', () => agent.get('/pokemons').expect(200));
    it('should get 200', () => agent.get('/pokemons?only=db').expect(200));
    it('should get 200 for the route id, if is a valid id', () => agent.get(`/pokemons/10`).expect(200));
    it('should get 404 for the route id, if is a valid id', () => agent.get(`/pokemons/10000`).expect(404));
  });
  describe('POST /pokemons', () => {
    it('It should show a message if the POST and the created pokemon were successful', () => agent.post('/pokemons').send(pokemon).then((resp) => {
      expect(resp.body.message).equal('Created!');
      expect(resp.body.DATA.name).equal(pokemon.name);
      expect(resp.body.successful).to.be.true;
      // toBeFalsy 
    }));
    it('It should show a message if the POST if the pokemon not send name and were not successful', () => {
      let pokemon2 ={...pokemon, name:null} ;
      agent.post('/pokemons').send(pokemon2).then((resp) => {
      expect(resp.body.message).equal("Name is required");
      expect(resp.body.successful).to.be.false;
    })
    });
  });
});
const pokemon2 = {
  life: 20,
  strong: 10,
  name: 'Pikachu',
  types:[1,5],
}
describe('Types routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => conn.sync({ force: true }));
  describe('GET /types', () => {
    it('should get 200', () => agent.get('/types').expect(200));
    it('should get be an array', () => agent.get('/types').then((resp)=> expect(resp.body).to.be.an('array')));
    it('should get 200 for the route id, if is a valid id', () => agent.get(`/types/10`).expect(200));
    it('should connect with pokemon type if i make a post', () => agent.post('/pokemons').send(pokemon2).then((respuesta)=> agent.get(`/types/1`).then(e=> {expect(e.body.pokemons.filter(e=> e.id ===  respuesta.body.DATA.id)).to.not.be.empty})) );
  });
});