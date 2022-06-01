const initialState = {
  totalPokemons: [],
  filteredPokemons: [],
  details: [],
  types: [],
  filtertypes: [],
  other: [],
  favorites:[],
};


export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    //Para obtener la lista completa de mi api y almacenarla en el estado
    case "GET_POKEMONS":
      if(payload.length > 60 ){
        let ids = [];
        let all = payload.filter(elem => {
          if (ids.find(e => e === elem.id)) { return false }
          else { ids.push(elem.id); return true }
        });
        return {
          ...state,
          totalPokemons: all,
          filteredPokemons: all,
        };
      }
      return {
        ...state,
        totalPokemons: payload,
        filteredPokemons: payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: payload,
      };
    case "GET_BY_NAME":
      return {
        ...state,
        filteredPokemons: payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        details: [payload],
      };
    case "ORDER":
      if (payload === "ZA") {
        return {
          ...state,
          filteredPokemons: state.filteredPokemons.sort((prev, next) =>
            prev.name > next.name ? -1 : 1
          ),
        };
      } else if (payload === "AZ") {
        return {
          ...state,
          filteredPokemons: state.filteredPokemons.sort((prev, next) =>
            prev.name > next.name ? 1 : -1
          ),
        };
      } else if (payload === "API") {
        let filter = state.filteredPokemons.filter((e) =>
          e.id > 0 && (e.id <= 898 || e.id > 10001)
        )
        return {
          ...state,
          filteredPokemons: filter.length === 0 ? ["Not Found"] : filter
        };
      } else if (payload === "DB") {
        let filter2 = state.filteredPokemons.filter((e) =>
          e.id > 898 && e.id < 10001
        )
        return {
          ...state,
          filteredPokemons: filter2.length === 0 ? ["Not Found"] : filter2
        }
      } else {
        return state
      }
    case "ORDER_TYPE":
      if (payload === "ZA") {
        return {
          ...state,
          other: state.other.sort((prev, next) =>
            prev.name > next.name ? -1 : 1
          ),
        };
      } else if (payload === "AZ") {
        return {
          ...state,
          other: state.other.sort((prev, next) =>
            prev.name > next.name ? 1 : -1
          ),
        };
      } else {
        return state
      }
    case "FILTER_TYPE":
      if (payload.type === "add") {
        return { 
          ...state, 
          filtertypes: state.filtertypes.concat(payload.id) 
        }
      } else if (payload.type === "remove") {
        return { 
          ...state, 
          filtertypes: state.filtertypes.filter(e => e !== payload.id[0]) 
        }
      } else { return state }
    case "FIL":
      if (payload) {
        let filtrado = state.totalPokemons.filter(e => e.id === parseInt(payload[0]));
        return { 
          ...state, 
          filteredPokemons: filtrado 
        }
      } else {
        let all = [];
        for (let i = 0; i < state.filtertypes.length; i++) {
          let filtrado = state.totalPokemons.filter(e => {
            for (let j = 0; j < e.types.length; j++) {
              if (e.types[j].id + "" === state.filtertypes[i]) { return true }
            }
            return false
          });
          all = all.concat(filtrado);
        }
        let ids = [];
        all = all.filter(elem => {
          if (ids.find(e => e === elem.id)) { return false }
          else { ids.push(elem.id); return true }
        });
        return { ...state, filteredPokemons: all[0]? all: ["Not Found"], filtertypes:[] };
      }
    case "GET_TYPE_ID":
      return {
        ...state,
        other: payload,
      };
    case "POST_POKEMON":
      return {
        ...state,
        totalPokemons: state.totalPokemons.concat(payload),
        filteredPokemons: state.filteredPokemons.concat(payload),
      };
    case "CLEAR":
      return {
        ...state,
        filteredPokemons: state.totalPokemons,
      };
    case "FAVORITE":
      if (payload.name === "ADD") {
        return { 
          ...state, 
          favorites: state.favorites.concat([payload.info]) 
        }
      } else if (payload.name === "REMOVE") {
        return { 
          ...state, 
          favorites: state.favorites.filter(e => e.id !== payload.info) 
        }
      } else { return state } 
    default:
      return state;
  }
}