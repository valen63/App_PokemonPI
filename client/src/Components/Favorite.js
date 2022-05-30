import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


import Pagination from "./Pagination";
import NotFound from "./NotFound";
import style from "./Favorite.module.css"
import Card from "./Home/Card";
import SearchBar from "./SearchBar/NavBar";


function Favorites() {

    const MaxPokes = 12;

    const { favorites } = useSelector((state) => state);

    let b = parseInt(useParams().page);
    const MaxPage = favorites.length >= 1 ? Math.ceil(favorites.length / MaxPokes) : 1;

    let Page = b > 0 ? b : 1;

    var lastindex = MaxPokes * Page; //        12 24 36 ...
    var firstindex = MaxPokes * (Page - 1); //  0 12 24 ... 
    const List = MaxPage > 1 ? favorites.slice(firstindex, lastindex) : favorites;

    console.log(favorites)
    return (
        <div>
            <SearchBar fav="not" btn="false"/>
            {favorites.length === 0 ? <NotFound type="C" /> : <div className={style.Info}>
                <div className={style.Crds}>
                    <div className={style.list}>
                        {List.map(e => <Card key={e.id} data={e} />)}
                    </div>
                    <div className={style.pag}><Pagination page={Page} max={MaxPage} url="/Favorite/" /></div>
                </div>
            </div>}
        </div>
    );
}

export default Favorites;