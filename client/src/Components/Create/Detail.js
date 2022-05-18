import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import SearchBar from "../SearchBar/NavBar";
import { FindById } from "../../Reducer/Action";
import CardD from "./CardD";

function Detail() {
  const dispatch = useDispatch();
  let id = useParams().id;
  if (!isNaN(parseInt(id))) { FindById(id)(dispatch); }

  return (
    <div>
      <SearchBar btn="false"/>
      <CardD />
    </div>
  );
}

export default Detail;