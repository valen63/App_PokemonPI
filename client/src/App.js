import { Route, Routes } from 'react-router-dom';
import './App.css';

import Loading from './Components/Loading/loading';
import Home from './Components/Home/Home';
import NewPokemon from "./Components/Create/NewPokemon.js";
import Detail from './Components/Create/Detail';
import NotFound  from './Components/NotFound';
import Favorites  from './Components/Favorite';

import { AllPokemons, AllTypes } from './Reducer/Action';
import Filter from './Components/Filters/Filter';
import FilterId from './Components/Filters/Byid';

function App() {
  AllPokemons();
  AllTypes();

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Loading />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Home/:page" element={<Home />} />
        <Route path="/Type" element={<Filter />} />
        <Route path="/Type/:id" element={<FilterId />} />
        <Route path="/Favorite" element={<Favorites />} />
        <Route path="/Favorite/:page" element={<Favorites />} />
        <Route path="/Type/:id/:page" element={<FilterId restar="NO"/>} />
        <Route path="/Create" element={<NewPokemon />}/>
        <Route path="/Pokemon/:id" element={<Detail />}/>
        <Route path="/:cualquierotracosa" element={<NotFound type="B2"/>}/>
        <Route path="/:cualquierotracosa/:cualquierotracosa" element={<NotFound type="B2"/>}/>
        <Route path="/:otracosa/:otracosa/:yotra" element={<NotFound type="B2"/>}/>
        <Route path="/:otracosa/:otracosa/:yotra/:yunamas" element={<NotFound type="B2"/>}/>
      </Routes>
    </div>
  );
}

export default App;
