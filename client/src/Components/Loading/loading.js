import { NavLink } from "react-router-dom";

import style from "./loading.module.css";
import creador from "./creador.png";
import title from "./h1.png";

function Loading() {
    return (
        <div className={style.Conteiner}>
            <img className={style.h1} src={title} alt=""/>
            <NavLink to="/Home">
                <h2 className={style.Ligth}> </h2>
                <img className={style.img} alt="" src="https://cutewallpaper.org/24/poke-ball-png/pokeball-f2dbc-png-c94d3-image-1276a-purepng-2a96f-free-afbea-transparent-d7e38-cc0-8118c-png-06692-image---library.png" />
            </NavLink>
            <img className="Creador" alt="" src={creador}/>
        </div>
    );
}

export default Loading;