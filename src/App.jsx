import { useState, useEffect } from "react";
import mystery from "./assets/question.jpg";
import "./App.css";
import BanList from "./components/BanList";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [start, setStart] = useState("");
  const [banList, setBanList] = useState([]);
  const [seenList, setSeenList] = useState([]);
  const fetchPokemon = async () => {
    try {
      const randomPokemonId = Math.floor(Math.random() * 898) + 1;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`
      );
      setPokemon(response.data);
      setStart("start");
      setSeenList([...seenList, pokemon.name]);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const addHeight = () => {
    setBanList([...banList, pokemon.height]);
  };
  const addWeight = () => {
    setBanList([...banList, pokemon.weight]);
  };
  const addType = () => {
    setBanList([...banList, pokemon.types[0].type.name]);
  };
  const addStat = () => {
    setBanList([...banList, pokemon.stats[0].base_stat]);
  };

  useEffect(() => {
    if (pokemon == null) {
      fetchPokemon;
    } else {
      while (true) {
        if (
          pokemon.height in banList ||
          pokemon.weight in banList ||
          pokemon.types[0].type.name in banList ||
          pokemon.stats[0].base_stat in banList
        ) {
          break;
        }
        fetchPokemon;
      }
    }
  }, []);

  console.log(banList);

  return (
    <>
      <div className="seenList">
        <div>
          <h1>Seen Pokémon</h1>
        </div>
        <div className="container">
          {seenList.map((item, index) => (
            <div key={index} className="seenListElements">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="checkList">
        <h1>Pokédex</h1>
        <p>Check out these pokemons!</p>
        <div>
          {start == "" ? (
            <img
              src={mystery}
              alt="picture of mystery pokemon"
              className="checkImg"
            />
          ) : (
            <>
              <h2 className="pokemonName">{pokemon.name.toUpperCase()}</h2>
              <div>
                <button id="atributes" onClick={addHeight}>
                  Height: {pokemon.height}dm
                </button>
                <button id="atributes" onClick={addWeight}>
                  Weight: {pokemon.weight}hg
                </button>
                <button id="atributes" onClick={addType}>
                  Type: {pokemon.types[0].type.name}
                </button>
                <button id="atributes" onClick={addStat}>
                  Base Stat: {pokemon.stats[0].base_stat}
                </button>
              </div>
              <img
                src={pokemon.sprites.front_shiny}
                alt="picture of pokemon"
                className="checkImg"
              />
            </>
          )}
        </div>
        <button onClick={fetchPokemon}>Next</button>
      </div>
      <div className="rightList">
        <h1>Ban List</h1>
        {banList.map((item, index) => (
          <button key={index} className="banListElements">
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
