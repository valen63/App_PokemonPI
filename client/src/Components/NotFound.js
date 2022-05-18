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
          <button className={style.btn} onClick={() => Click()}>GO BACK</button>
        </div> :
        type === "B" || type === "B2" ?
          <div className={type === "B" ? style.errorB : style.errorB2}>
            <div className={style.cuatroB}>4<img src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/0/0b/latest/20160904204605/Snorlax.png/1200px-Snorlax.png" alt="" className={style.img} />4</div>
            <p className={style.pB}>This page not exist.</p>
            <p className={style.pB}>There was an error, check the writing and try again </p>
            <NavLink className={style.btnB} to="/Home">GO BACK</NavLink>
          </div>
          : null}
    </div>
  );
}

export default NotFound;