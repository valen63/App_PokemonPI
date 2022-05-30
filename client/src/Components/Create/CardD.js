import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NotFound from "../NotFound";
import Wait from "../Wait";
import star from "../starnot.png";
import starselect from "../star.png";
import { Favorites } from "../../Reducer/Action";

import style from "./Card.module.css";

function CardD({id, dispatch}) {
    const { details, favorites } = useSelector((state) => state);
    let info = details[0];

    function Click(e){
        if(e.target.alt === "not"){Favorites("ADD", details[0])(dispatch)}
        else if(e.target.alt === "yes"){Favorites("REMOVE",details[0].id)(dispatch)}
    }
    return (
        <div className={style.CardD}>
            {details.length === 0 ? <Wait />:
            details[0] === 404? < NotFound type="A"/>:
            details[0].id !== id? < Wait/>:
                <div className={style.info}>
                    <button onClick={(e)=> Click(e)} className={style.starbtn}>{favorites.filter(e=>e.id === id).length>0 ? 
            <img alt="yes" src={starselect} className={style.star} />:<img alt="not" src={star} className={style.star} />}</button>
                    <h1 className={style.h1}>{info.name.toUpperCase()}</h1>
                    <img alt="" src={info.img} className={style.imagen}/>
                    
                    {info.life ? <p className={style.p1}>Health Points: <label className={style.label1}>{info.life}</label> 
                    <input type="range" max="150" min="0" value={info.life} readOnly={true} /> </p> : null}
                    {info.strong ? <p className={style.p1}>Strong: <label className={style.label1}>{info.strong}</label>
                    <input type="range" max="150" min="0" value={info.strong} readOnly={true} /></p> : null}
                    {info.speed ? <p className={style.p1}>Speed: <label className={style.label1}>{info.speed}</label> 
                    <input type="range" max="150" min="0" value={info.speed} readOnly={true} /></p> : null}
                    {info.defense ? <p className={style.p1}>Defense: <input type="range" max="150" min="0" value={info.defense} readOnly={true} /> <label className={style.label1}>{info.defense}</label></p> : null}
                    {info.height ? <p className={style.p1}>Height: <input type="range" value={info.height} readOnly={true} /> 
                    <label className={style.label1}>{info.height}</label></p> : null}
                    {info.weight ? <p className={style.p1}>Weight: <input type="range" value={info.weight} readOnly={true} /> 
                    <label className={style.label1}>{info.weight}</label></p> : null}
                    
                    {info.types.length > 0 ?<div className={style.Types}>
                        {info.types.map(e => <NavLink to={`/Type/${e.id}`} className={style.Butons} key={e.id}>{e.name.toUpperCase()}</NavLink>)}
                    </div> : null}
                </div>}
        </div>
    );
}

export default CardD;