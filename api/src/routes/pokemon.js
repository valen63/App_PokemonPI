const { Router } = require('express');
const router = Router();
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const { Pokemon, Type } = require("../db");
const { getAll, Find, getById, allTypes} = require("./funtions");

router.get("/", async (req, res) => {
    var infdb = await Pokemon.findAll({include: Type})
    var { name, only } = req.query;
    only = only ? only.toUpperCase() : null;
    try {
        if (name) {
            let nameResultdb = parseInt(name)? await Pokemon.findAll({where: {[Op.or]: [{ name:{ [Op.like]:`%${name}%`}},{id: name}]}, include: Type,}) : await Pokemon.findAll({where: { name:{ [Op.like]:`%${name}%`}}, include: Type,});
            var nameResultapi = await Find(name)
            if(only === "DB"){res.send(nameResultdb)}
            else if(only === "API"){res.send(nameResultapi)}
            else{
                // console.log(nameResultdb,nameResultapi);
               let Allinfo = nameResultapi.concat(nameResultdb);
            Allinfo.length > 0 ? res.send(Allinfo): res.status(404).send("Name is not valid"); 
            }
        }else if (only === "DB") {
            res.send(infdb);
        }else if (only === "API") {
            var infapi = await getAll();
            res.send(infapi);
        }else if (!name) {
            var infapi = await getAll();
            let Allinfo = infapi.concat(infdb);
            res.send(Allinfo);
        }
    } catch (err) {
        console.log("pokemons /GET  ERROR: ",err);
        res.status(400);
    }
});

router.get("/:id", async(req, res) => {
    var {id} = req.params;
    try {
        if(parseInt(id)=== NaN){ res.status(404).send("Is not valid ID")}
        else if(id> 0 && id<=898 || id> 10001){
            var infapi = await getById(id);
            res.send(infapi);
        }else{
            let idResultdb = await Pokemon.findOne({where: { id: id }, include: Type,});
            idResultdb ? res.send(idResultdb): res.status(404).send("Is not valid ID");
        }    
    } catch (err) {
        console.log("pokemons /GET/:id  ERROR: ",err);
        res.status(400); 
    }
 });


// let minid = 1126;
let minid = 898;

router.post("/", async (req, res) => {
    minid++;
    var all = await Type.findAll();
    try {
        if(all.length === 0){
            await allTypes();
           all = await Type.findAll();
        }
        var { name, life, defense, strong, speed, height, weight, img, types} = req.body;
        if (name) {
            img = img ? img : "https://cdn.iconscout.com/icon/premium/png-256-thumb/pokeball-games-video-casino-gamer-1-42381.png";
            const newPoke = await Pokemon.create({
                id: minid,
                name, life, defense, strong, speed, height, weight, img
            })
            types ? await newPoke.addType(types): null;
            const Poke = await Pokemon.findOne(({ where:{id: minid}, include: Type}));
            res.send({ successful: true, message: "Created!", DATA: Poke });
        } else { res.send({ successful: false, message: "Name is required" }) }

    } catch (error) {
        console.log("pokemons /POST  ERROR: ", error);
        res.status(400);
    }
});



module.exports = router;