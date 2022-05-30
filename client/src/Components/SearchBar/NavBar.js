import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { FindByName } from "../../Reducer/Action";
import style from "./Nav.module.css";
import imagen from "./menu.png"

function SearchBar(props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const Find = () => {
    if (value !== "") {
      console.log(FindByName(value)(dispatch))
      FindByName(value)(dispatch);
    }
  }
   
  function Panel() {
    let panel = document.getElementById("PANEL");
    if (panel) {
      panel.className === "Active_Panel" ? panel.className = "Not_Panel" : panel.className = "Active_Panel";
    }
  }

  const Changes = (e) => {
    setValue(e.target.value);
  }

  return (
    <div className={style.Nav}>
      {props.other==="yes"? <NavLink to="/Type" className={style.btn}>TYPES</NavLink>:<NavLink to="/Home" className={style.btn}>HOME</NavLink>}
      <div>
        <input placeholder="Find Pokemon... " id="Find" onChange={(e) => Changes(e)} className={style.input} />
        <button onClick={() => Find()} className={style.btn2}><NavLink to="/Home" className={style.NavLink}>Search</NavLink></button>
      </div>
      <NavLink to="/Create" className={style.btn}>Create Pokemon</NavLink>
      {props.fav ? null: <NavLink to="/Favorite" className={style.btn}>Fav</NavLink>}
      {props.btn === "false" ? null:<button onClick={() => Panel()} className={style.btn3}><img className={style.img} alt="" src={imagen} /></button>}
    </div>
  );
}

export default SearchBar;