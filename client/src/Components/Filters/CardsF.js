import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import { order } from "../../Reducer/Action";

import Pagination from "../Pagination";
import NotFound from "../NotFound";
import style from "./Filter.module.css"


function CardF({ id }) {

  const MaxPokes = 12;

  const { other } = useSelector((state) => state);
  const dispatch = useDispatch();
  
  let b = parseInt(useParams().page);
  const MaxPage = other.length >= 1 ? Math.ceil(other.length / MaxPokes) : 1;

  let Page = b > 0 ? b : 1;

  var lastindex = MaxPokes * Page; //        12 24 36 ...
  var firstindex = MaxPokes * (Page - 1); //  0 12 24 ... 
  const List = MaxPage > 1 ? other.slice(firstindex, lastindex) : other;

  let a = ">";

  function Click(e) { order(e.target.id)(dispatch) }

  return (
    <div>
      {other.length === 0 ? <NotFound type="A" name="type"/> : <div className={style.Info}>
        <div className={style.Crds}>
          <div className={style.list}>
            {List.map(e => <NavLink to={`/Pokemon/${e.id}`} key={e.id} className={style.Crd}>{e.name.toUpperCase()}</NavLink>)}
          </div>
          <div className={style.pag}><Pagination page={Page} max={MaxPage} url={`/Type/${id}/`} /></div>
        </div>
        <div className={style.panel}>
          <button className="boton" id="AZ" onClick={(e) => Click(e)}>Orden by Name: ( A -{a} Z)</button>
          <button className="boton" id="ZA" onClick={(e) => Click(e)}>Orden by Name: ( Z -{a} A )</button>
          {/* <div> <button id="API" className="boton" onClick={(e => Click(e))}>API</button>
          <button className="boton" id="DB" onClick={(e => Click(e))}>DATABASE</button></div> */}
        </div>
      </div>}
    </div>
  );
}

export default CardF;