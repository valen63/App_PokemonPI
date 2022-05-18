import React from "react";
import { configure, mount, shallow, } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Wait from "./Components/Wait";
import Loading from "./Components/Loading/loading";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Card from "./Components/Home/Card";
import Home from "./Components/Home/Home";
import SearchBar from "./Components/SearchBar/NavBar";
import { Provider } from "react-redux";
import store from "./Reducer/store";
import Cards from "./Components/Home/Cards";
import NewPokemon from "./Components/Create/NewPokemon";

configure({ adapter: new Adapter() });

describe("<Wait />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Wait />);
  });
  it('deberia renderizar un "p" que contenga el texto Loading', () => {
    expect(wrapper.contains(<p>Loading...</p>)).toEqual(true);
  });
  it('deberia renderizar un "label" que tenga la clase waiting', () => {
    expect(wrapper.contains(<label className="waiting">Please wait while the pokemon's finish loading.</label>)).toEqual(true);
  });
});

describe("<Card />", () => {
  let wrapper;
  var data = { name: "pika2", id: 10, types: [{ name: "fire", id: 10 }, { name: "ghost", id: 20 }] }
  beforeEach(() => {
    wrapper = mount(<BrowserRouter><Routes><Route path="/" element={<Card data={data} />} /></Routes></BrowserRouter>);
  });
  it('deberia renderizar un NavLink que tenga el nombre', () => {
    expect(wrapper.find(NavLink).at(0).text()).toEqual(data.name.toUpperCase());
  });
  it('deberia renderizar un NavLink por cada tipo', () => {
    expect(wrapper.find(NavLink)).toHaveLength(3);
    expect(wrapper.find(NavLink).at(1).text()).toEqual("FIRE");
    expect(wrapper.find(NavLink).at(2).text()).toEqual("GHOST");
  });
});

describe("<Loading />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<BrowserRouter><Routes><Route path="/" element={<Loading />} /></Routes></BrowserRouter>);
  });
  it('deberia renderizar un "h1" que tenga el texto POKEAPP', () => {
    expect(wrapper.find("h1").at(0).text()).toEqual("POKEAPP");;
  });
  it('deberia renderizar un NavLink para redireccionar a la pagina principal', () => {
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });
});

describe("<Home />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Provider store={store}><BrowserRouter><Routes><Route path="/" element={<Home />} /></Routes></BrowserRouter></Provider>);
  });
  it('deberia renderizar un SearchBar y Cards ', () => {
    expect(wrapper.find(SearchBar)).toHaveLength(1);
    expect(wrapper.find(Cards)).toHaveLength(1);
  });
});

describe("<NewPokemon />", () => {
  let wrapper, useState, useStateSpy;
  beforeEach(() => {
    useState = jest.fn();
    useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation((init) => [init, useState]);
    wrapper = mount(<Provider store={store}><BrowserRouter><Routes><Route path="/" element={<NewPokemon />} /></Routes></BrowserRouter></Provider>);
  });
  it('deberia renderizar un SearchBar ', () => {
    expect(wrapper.find(SearchBar)).toHaveLength(1);
  });
  it('deberia renderizar un Formulario "form" ', () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });
  it('Renderiza un input con la propiedad "name" igual a "life" "strong "defense" "speed"', () => {
    expect(wrapper.find('input[name="life"]')).toHaveLength(1);
    expect(wrapper.find('input[name="strong"]')).toHaveLength(1);
    expect(wrapper.find('input[name="defense"]')).toHaveLength(1);
    expect(wrapper.find('input[name="speed"]')).toHaveLength(1);
  });
  describe("Manejo de inputs con estado", () => {
    it("El form deberia cambiar de estado cuando escriban en el input de name", () => {
      wrapper.find('input[name="name"]').simulate("change", {
        target: { name: "name", value: "My new value"},
      });
      expect(useState).toHaveBeenCalledWith({
        defense: 0,
        height: 0,
        img: null,
        life: 0,
        name: "My new value",
        speed: 0,
        strong: 0,
        types: [],
        weight: 0,
      });
    })
    it("El form deberia cambiar de estado cuando escriban en el input de life", () => {
      wrapper.find('input[name="life"]').simulate("change", {
        target: { name: "life", value: 10 },
      });
      expect(useState).toHaveBeenCalledWith({
        defense: 0,
        height: 0,
        img: null,
        life: 10,
        name: "",
        speed: 0,
        strong: 0,
        types: [],
        weight: 0,
      });
    })
    it("El form deberia cambiar de estado cuando escriban en el input de height", () => {
      wrapper.find('input[name="height"]').simulate("change", {
        target: { name: "height", value: 20 },
      });
      expect(useState).toHaveBeenCalledWith({
        defense: 0,
        height: 20,
        img: null,
        life: 0,
        name: "",
        speed: 0,
        strong: 0,
        types: [],
        weight: 0,
      });
    })
  })
})