import { NavLink } from "react-router-dom";
import style from "./Card.module.css";
import star from "../starnot.png";
import starselect from "../star.png";
import { useDispatch, useSelector } from "react-redux";
import { Favorites } from "../../Reducer/Action";


function Card(props) {
    const dispatch = useDispatch()
    const { favorites } = useSelector((state) => state);
    var { name, img, id, types } = props.data;

    function Click(e){
        if(e.target.alt === "not"){Favorites("ADD",props.data)(dispatch)}
        else if(e.target.alt === "yes"){Favorites("REMOVE",id)(dispatch)}
    }
    return (
        <div className={style.Card} id={id}>
            {props.star ? null:<button onClick={(e)=> Click(e)} className={style.starbtn}>{favorites.filter(e=>e.id === id).length>0 ? 
            <img alt="yes" src={starselect} className={style.star} />:<img alt="not" src={star} className={style.star} />}</button>}
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