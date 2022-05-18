const { Router } = require('express');
const router = Router();

const { Type, Pokemon, } = require("../db");
const { allTypes, Typesss } = require("./funtions");

router.get("/", async (req, res) => {
    var all = await Type.findAll();
    try {
        if(all.length === 0){
            await allTypes();
            all = await Type.findAll();
        }
        res.send(all); 
    } catch (err) {
        console.log("types /GET ERROR: ",err);
        res.status(400); 
    }
});

router.get("/:id", async (req, res) => {
    var { id }= req.params;
    try {
        let db = await Type.findAll({where:{id:id}, include: Pokemon});
        let Type_id=  await Typesss(id);
        Type_id.pokemons= db[0]? Type_id.pokemons.concat(db[0].pokemons): Type_id.pokemons;
        Type_id ? res.send(Type_id): res.status(404).send("Must be a valid ID"); 
    } catch (err) {
        console.log("types/:id /GET ERROR: ",err);
        res.status(400); 
    }
});

module.exports = router;
