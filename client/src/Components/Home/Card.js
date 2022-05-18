import { NavLink } from "react-router-dom";
import style from "./Card.module.css";

function Card(props) {

    var { name, img, id, types } = props.data;
    
    return (
        <div className={style.Card} id={id}>
            <NavLink className={style.Link} to={`/Pokemon/${id}`}>{name.toUpperCase()}</NavLink>
            <img className={style.imagen} src={img} alt="" />
            {types.length > 0 ?
                <div className={style.Types}>
                    {types.map(e => <NavLink to={`/Type/${e.id}`} className={style.Butons} key={e.id}>{e.name.toUpperCase()}</NavLink>)}
                </div> : null}
        </div>
    );
}

export default Card;