import style from "./NotFound.module.css";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { Clear } from "../Reducer/Action";


function NotFound({ type, name }) {
  const dispatch = useDispatch();

  function Click() {
    Clear(dispatch);
  }

  return (
    <div>
      {type === "A" ?
        <div className={style.errorA}>
          <div className={style.cuatro}>4<img src="https://www.pngkey.com/png/full/519-5194869_pikachu-circle-png.png" alt="" className={style.img} />4</div>
          <p className={style.p}>This {name} does not exist.</p>
          {name === "type" ?<p className={style.p}>Maybe not have pokemons for this type for now, check the writing and try again </p>:<p className={style.p}>There was an error, check the writing and try again </p>}
          {name === "type" ?<NavLink className={style.btn} to="/Home">GO BACK</NavLink> :<button className={style.btn} onClick={() => Click()}>GO BACK</button>}
        </div> :
        type === "B" || type === "B2" ?
          <div className={type === "B" ? style.errorB : style.errorB2}>
            <div className={style.cuatroB}>4<img src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/0/0b/latest/20160904204605/Snorlax.png/1200px-Snorlax.png" alt="" className={style.img} />4</div>
            <p className={style.pB}>This page not exist.</p>
            <p className={style.pB}>There was an error, check the writing and try again </p>
            <NavLink className={style.btnB} to="/Home">GO BACK</NavLink>
          </div> :
        type === "C" ?
          <div className={style.errorC}>
            <p className={style.pB}>You not have favorites pokemons for now</p>
            <img src="https://i.gifer.com/origin/06/068c8f36ce4e0216bcc86ccc2e2401a0_w200.gif" alt="" className={style.img} />
            <p className={style.pB}> Go to home an add some pokemons</p>
            <NavLink className={style.btnC} to="/Home">GO BACK</NavLink>
          </div>
          : null}
    </div>
  );
}

export default NotFound;