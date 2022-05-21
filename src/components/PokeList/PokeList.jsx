import { useEffect, useState } from "react";
import "../PokeList/PokeList.scss";
import axios from "axios";

function PokeList() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonListDetails, setPokemonListDetails] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  
  const imgBall = 'https://cdn-icons-png.flaticon.com/512/528/528101.png';


  useEffect(() => {
    const fetchPokemons = async () => {
      let response;
      let detailsResponse;

      try {
        response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        setPokemonList(response.data.results);
      } catch (err) {
        console.log(err);
      }

      try {
        detailsResponse = await Promise.all(
          response.data.results.map((item) => {
            return axios.get(item.url);
          })
        );
      } catch (err) {
        console.log(err);
      }
      const resData = detailsResponse.map(item => item.data)
      setPokemonListDetails(resData);
      console.log(resData)
    };

    fetchPokemons();
  }, [offset, limit]);

  return (
    <div className={"main center"}>
      {pokemonListDetails.map(pokemon => (
      <div className={"box center"}>
          <img src={pokemon.sprites.front_default}/>
            <div>
              <p className={"pokemon-name"}>{pokemon.name}</p>
              <p className={"skill"}>Attack</p>
            </div>
            <div className={"pokeBall-container center"}>
              <img className={"klicked-Ball"} src={imgBall}/>
            </div>
            <div className={"left-container"}>
              <p>Skills</p>
              <div className={"attributes"}>
                <div>HP</div>
                <div>Attack</div>
                <div>Defence</div>
              </div>
              <div className={"cancel center"}>
                <img className={"klicked-Ball"} src={imgBall}/>
              </div>
            </div>
      </div>
        ))}
    </div>
  );
}

export default PokeList;
