import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NotFound from "../NotFound";
import Pagination from "../Pagination";
import Wait from "../Wait";
import Card from "./Card";
import style from "./Card.module.css";

function Cards() {

  const MaxPokes = 12;

  const { filteredPokemons, totalPokemons } = useSelector((state) => state);
  let b = parseInt(useParams().page);
  const MaxPage = filteredPokemons.length >= 1 ? Math.ceil(filteredPokemons.length / MaxPokes) : 1;

  let Page = b > 0 ? b : 1;

  var lastindex = MaxPokes * Page; //        12 24 36 ...
  var firstindex = MaxPokes * (Page - 1); //  0 12 24 ... 
  const List = MaxPage > 1 ? filteredPokemons.slice(firstindex, lastindex) : filteredPokemons;
  console.log(List);

  return (
    <div className={style.Info}>
      {totalPokemons.length === 0 ? <Wait /> :
        filteredPokemons[0] === "Not Found" ? <NotFound type="A" name="pokemon(s)"/> :
          Page > MaxPage ? <NotFound type="B" /> :
            <div className={style.Cards}>
              {List.map(e => <Card key={e.id} data={e} />)}
            </div>}
      {MaxPage >= 1 && Page<=MaxPage && totalPokemons.length !== 0 && filteredPokemons[0] !== "Not Found" ? 
      <Pagination page={Page} max={MaxPage} url="/Home/"/> : null}
    </div>
  );
}

export default Cards;