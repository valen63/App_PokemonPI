import { useDispatch, useSelector } from "react-redux";

import { orderByName, F_Types, filterT, AllPokemons2 } from "../../Reducer/Action";
import "./Panel.css";

function Panel() {

    const { types, filtertypes } = useSelector((state) => state);
    const dispatch = useDispatch();
    let a = ">";

    function Click(e) { 
        if(e.target.className==="boton"){
            orderByName(e.target.id)(dispatch);
            e.target.className="boton_act";
            return
        } 
        dispatch({type: "CLEAR"})
        document.getElementById("API").className="boton"
        document.getElementById("DB").className="boton"
    }

    function Click2(e) { if (e.target.value !== "1") { orderByName(e.target.value)(dispatch) } }

    function Click3() { AllPokemons2(dispatch) }

    function Input_check(e) { if (e.target.checked) { F_Types(e.target.id, "add")(dispatch) } else { F_Types(e.target.id, "remove")(dispatch) } }

    function Filters() { 
        filterT(null)(dispatch); let inputs= document.querySelectorAll('input[type="checkbox"]:checked');
        for(let i=0;i<inputs.length;i++){inputs[i].checked=false}
    }

    return (
        <div id="PANEL" className="Not_Panel">
            <button name="CLEAR" className="boton" onClick={(() => Click3())}>Show All Pokemons</button>
            <select name="nombre" className="boton" onChange={(e) => Click2(e)} >
                <option value="1">Select--- </option>
                <option value="AZ" >Orden by Name (A-{a}Z)</option>
                <option value="ZA" >Orden by Name (Z-{a}A)</option>
            </select>
            <div> 
                <button id="API" className="boton" onClick={(e => Click(e))}>API</button>
                <button className="boton" id="DB" onClick={(e => Click(e))}>DATABASE</button>
            </div>
            Types:
            <div>
                {types.length === 0 ? null : types.map(e => 
                    <div className="types" key={e.id}>
                        <input type="checkbox" id={e.id} name={e.name} onClick={(e) => Input_check(e)} /><p>{e.name.toUpperCase()}</p>
                    </div>)}
            </div>
            {filtertypes.length === 0 ? <p></p> : <button onClick={() => Filters()} className="boton">Filter</button>}
        </div >
    );
}

export default Panel;