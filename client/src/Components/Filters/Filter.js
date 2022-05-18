import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import SearchBar from "../SearchBar/NavBar";
import style from "./Filter.module.css";

function Filter() {
    const { types } = useSelector((state) => state);
    return (
        <div>
            <SearchBar btn="false" />
            <div className={style.Conteiner}>{types.map(e => 
              <NavLink to={`/Type/${e.id}`} className={style.btn} key={e.id}>{e.name.toUpperCase()}</NavLink>)}
            </div>
        </div>
    );
}

export default Filter;