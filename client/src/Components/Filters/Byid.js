import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import SearchBar from "../SearchBar/NavBar";
import CardF from "./CardsF";
import { FindType } from "../../Reducer/Action";


function FilterId(props) {
    let id= useParams().id;
    const dispatch = useDispatch();
    if (!isNaN(parseInt(id)) && props.restar !== "NO") { FindType(id)(dispatch); }
    // if (!isNaN(parseInt(id))) { FindType(id)(dispatch); }
    return (
        <div>
            <SearchBar btn="false" />
            <CardF id={id}/>
        </div>
    );
}

export default FilterId;