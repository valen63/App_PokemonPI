const axios = require("axios");
const { Type } = require("../db");

let PokemonsData = [];

async function getAll() {
    try {
        if(PokemonsData.length < 40 ){for (let i = 1; i < 51; i++) {
            let Onepokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)//Voy a la url de la pagina, copio todo
                .then((resp) => {
                    console.log(resp.data.id)
                    let todo = resp.data;
                    let tipos = todo.types.map(e => { return { id: parseInt(e.type.url.split("/")[6]), name: e.type.name } });

                    return ({
                        id: todo.id, name: todo.name,
                        life: todo.stats[0].base_stat, strong: todo.stats[1].base_stat, defense: todo.stats[2].base_stat, speed: todo.stats[5].base_stat,
                        height: todo.height, weight: todo.weight, img: todo.sprites.front_default,
                        types: tipos
                    })
                }).catch(()=> i=i-1)
            PokemonsData.push(Onepokemon);
        }
        }
        return (PokemonsData)
    } catch (error) {
        throw ("get API Original ERROR", error);
    }
}

async function Find(name) {
    name = name.toLowerCase();
    try {
        let Onepokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((resp) => {
                let todo = resp.data;
                let tipos = todo.types.map(e => { return { id: parseInt(e.type.url.split("/")[6]), name: e.type.name } });

                return ([{
                    id: todo.id, name: todo.name,
                    life: todo.stats[0].base_stat, strong: todo.stats[1].base_stat, defense: todo.stats[2].base_stat, speed: todo.stats[5].base_stat,
                    height: todo.height, weight: todo.weight, img: todo.sprites.front_default,
                    types: tipos
                }])
            }
            ).catch(() => []);

        return Onepokemon;
    } catch (error) {
        throw ("Find API Original ERROR", error);
    }
}

async function getById(id) {
    try {
        let Onepokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)//Voy a la url de la pagina, copio todo
            .then((resp) => {
                let todo = resp.data;
                let tipos = todo.types.map(e => { return { id: parseInt(e.type.url.split("/")[6]), name: e.type.name } });

                return ({
                    id: todo.id, name: todo.name,
                    life: todo.stats[0].base_stat, strong: todo.stats[1].base_stat, defense: todo.stats[2].base_stat, speed: todo.stats[5].base_stat,
                    height: todo.height, weight: todo.weight, img: todo.sprites.front_default,
                    types: tipos
                })
            })
        return (Onepokemon);
    } catch (error) {
        throw ("get API Original ERROR", error);
    }
}

const allTypes = async () => {
    try {
        let All = await axios.get("https://pokeapi.co/api/v2/type")
            .then((resp) => resp.data.results);
        All.map(async (e) => {
            let obj = { name: e.name, id: e.url.split("/")[6] };
            await Type.create(obj);
        })
    } catch (error) {
        throw ("get API Original ERROR", error);

    }
    return await Type.findAll();
};
const Typesss = async (id) => {
    try {
        let All = await axios.get(`https://pokeapi.co/api/v2/type/${id}`)
            .then((resp) => {
                let pokemons =  resp.data.pokemon;
                pokemons =pokemons.map(e=>{
                    return({name:e.pokemon.name, id: e.pokemon.url.split("/")[6]})
                });
                return({id:  resp.data.id, name:  resp.data.name, pokemons});
            })
        return All;
    } catch (error) {
        throw ("get API Original ERROR", error);

    }
};

module.exports = {
    getAll,
    Find,
    getById,
    allTypes,
    Typesss

};