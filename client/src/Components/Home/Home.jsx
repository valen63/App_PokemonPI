import Panel from "../Panel/Panel";
import SearchBar from "../SearchBar/NavBar";
import Cards from "./Cards";
import style from "./Card.module.css"

function Home() {
  return (
    <div>
      <SearchBar other="yes" />
      <div className={style.All}>
        <Cards/>
        <Panel />
      </div>
    </div>
  );
}

export default Home;