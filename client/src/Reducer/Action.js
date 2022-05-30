import axios from "axios";
import { useDispatch } from "react-redux";

export async function AllPokemons() {
  const dispatch = useDispatch();
  await axios.get(`http://localhost:3001/pokemons`)
    .then((res) => {
      console.log("Ya tengo los pokemones");
      dispatch({ type: "GET_POKEMONS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      alert("Ups! Something went wrong...");
    });
};

export async function AllTypes() {
  const dispatch = useDispatch();
  await axios.get(`http://localhost:3001/types`)
    .then((res) => {
      console.log("Ya tengo los tipos");
      dispatch({ type: "GET_TYPES", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      alert("Ups! Something went wrong...");
    });
};

export async function AllPokemons2(dispatch) {
  await axios.get(`http://localhost:3001/pokemons`)
    .then((res) => {
      dispatch({ type: "GET_POKEMONS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      alert("Ups! Something went wrong...");
    });
};


export function FindByName(name, only = null) {
  return async function (dispatch) {
    await axios.get(`http://localhost:3001/pokemons?name=${name}`)
      .then((res) => {
        dispatch({ type: "GET_BY_NAME", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "GET_BY_NAME", payload: [err.response.statusText] });
      });
  }
};

export function createNew(input) {
  input.name = input.name.toLowerCase();
  return async function (dispatch) {
    await axios.post("http://localhost:3001/pokemons", input)
      .then(resp => resp.data)
      .then(respuesta => dispatch({
        type: "POST_POKEMON",
        payload: [respuesta.DATA],
      })).catch((err) => {
        console.log(err);
        alert("Ups! Something went wrong...");
      });
  }
};

export function Clear(dispatch) {
  dispatch({type: "CLEAR",});
};

export function FindById(id) {
  return async function (dispatch) {
    await axios.get(`http://localhost:3001/pokemons/${id}`)
      .then((res) => {
        dispatch({ type: "GET_DETAIL", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "GET_DETAIL", payload: 404 });
      });
  }
};

export function orderByName(type) {
  return async function (dispatch) {
    dispatch({ type: "ORDER", payload: type });
  }
};

export function F_Types(id,type) {
  return async function (dispatch) {
    dispatch({ type: "FILTER_TYPE", payload: {id: [id], type} });
  }
};

export function filterT(id) {
  return async function (dispatch) {
    dispatch({ type: "FIL", payload: id });
  }
};

export function FindType(id) {
  return async function (dispatch) {
    await axios.get(`http://localhost:3001/types/${id}`)
      .then((res) => {
        dispatch({ type: "GET_TYPE_ID", payload: res.data.pokemons });
      })
      .catch(() => {
        dispatch({ type: "GET_TYPE_ID", payload: [404] });
      });
  }
};

export function order(type) {
  return async function (dispatch) {
    dispatch({ type: "ORDER_TYPE", payload: type });
  }
};

export function Favorites(name, info) {
  return async function (dispatch) {
    dispatch({ type: "FAVORITE", payload:{name, info}});
  }
};