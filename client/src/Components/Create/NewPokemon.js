import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createNew } from "../../Reducer/Action.js"
import SearchBar from "../SearchBar/NavBar.js";
import style from "./New.module.css";

function Validate(input){
  let errores={};
  if (input.name !== "" && input.types.length>0) {
    return(null)
  } if(input.name ==="") {
    errores.name= "The name is required"
  } if(input.types.length===0) {
    errores.types= "Select at least one type of pokemon" ;
  }
  return errores
}

function NewPokemon() {

  const { types } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [input, setInput] = React.useState({
    name: "", life: 0, strong: 0, defense: 0, speed: 0, height: 0, weight: 0,
    types: [], img: null,
  }); 
  const [errores, seterrores] = useState({});

  const Submitiar = (e) => {
    e.preventDefault();
    let formulario = document.getElementById('formul');
    let errorfind =Validate(input)
    if (!errorfind) {
      createNew(input)(dispatch);
      seterrores({ good: "Pokemon: " + input.name + "  Created!" });
      setInput({ name: "", life: 0, strong: 0, defense: 0, speed: 0, height: 0, weight: 0, types: input.types, img: null, });
      formulario.reset();
    } else {
      seterrores(errorfind);
    }
  }

  const Changes = (e) => {
    if (e.target.name === "img" && e.target.value === "") { setInput({ ...input, img: null }); return }
    setInput({ ...input, [e.target.name]: e.target.value });
    if(e.target.value=== "" && e.target.name === "name") {seterrores({...errores, name: "The name is required"})}else if(e.target.value!== "" && e.target.name === "name"){seterrores({...errores, name:null})}
    
  }
  const Types = (e) => {
    if (e.target.className === "btns_not") {
      e.target.className = "btns_selec";
      setInput({...input, types: input.types.concat([parseInt(e.target.id)]) })
    } else { e.target.className = "btns_not";
    setInput({...input, types: input.types.filter(el=> el!==parseInt(e.target.id)) })
   };
  }

  return (
    <div>
      <SearchBar btn="false" />
      <div className={style.background}>
        <form className={style.form} onSubmit={(e) => Submitiar(e)} id="formul">

          <h1>Create a New Pokemon</h1>
          <label className={style.label}>The places with * are required</label>
          
          <div className={style.divs}>
            Name*:<input name="name" placeholder="Insert Name..." onChange={(e) => Changes(e)} />
          </div>
          {errores.name ? <label className={style.errors}>{errores.name}</label> : null}

          <div className={style.divs}>
            Life (Health Points) : <input name="life" type="number" min="0" defaultValue={0} onChange={(e) => Changes(e)} />
          </div>
          <div className={style.divs}>
            Strong-Attack : <input name="strong" type="number" min="0" defaultValue={0} onChange={(e) => Changes(e)} />
          </div>
          <div className={style.divs}>
            Defense : <input name="defense" type="number" min="0" defaultValue={0} onChange={(e) => Changes(e)} />
          </div>
          <div className={style.divs}>
            Speed : <input name="speed" type="number" min="0" defaultValue={0} onChange={(e) => Changes(e)} />
          </div>
          <div className={style.divs}>Height : <input name="height" type="number" min="0" defaultValue={0} onChange={(e) => Changes(e)} /></div>
          <div className={style.divs}>Weight : <input name="weight" type="number" min="0" defaultValue={0} onChange={(e) => Changes(e)} /></div>
          <div className={style.divs}>Url Image : <input name="img" type="url" placeholder="Insert a URL..." onChange={(e) => Changes(e)} /></div>
          <div className={style.tp}>
            {types ? types.map(e => 
            <label id={e.id} className="btns_not" onClick={(e) => Types(e)} key={e.id}>{e.name.toUpperCase()}</label>) : null}
          </div>
          {errores.types ? <label className={style.errors}>{errores.types}</label> : null}

          <input type="submit" value="Send" className={style.send}></input>
          {errores.good ? <label className={style.good}>{errores.good}</label> : null}

        </form>
      </div>
    </div>
  );
}

export default NewPokemon;