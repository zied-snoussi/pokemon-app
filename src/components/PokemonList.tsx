import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../graphql/queries";

const PokemonList = () => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 50 },
  });

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  interface Pokemon {
    name: string;
    image: string;
    stats: {
      hp: number;
      attack: number;
      defense: number;
      speed: number;
    };
  }

  const filteredPokemons = data.pokemons.results.filter((pokemon: Pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="pokemon-list">
      {data.pokemons.results.map(
        (pokemon: {
          name: string;
          image: string;
          stats: { hp: number; attack: number; defense: number; speed: number };
        }) => (
          <div key={pokemon.name} className="pokemon-item">
            <h3>{pokemon.name}</h3>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>HP: {pokemon.stats.hp}</p>
            <p>Attack: {pokemon.stats.attack}</p>
            <p>Defense: {pokemon.stats.defense}</p>
            <p>Speed: {pokemon.stats.speed}</p>
          </div>
        )
      )}
    </div>
  );
};

export default PokemonList;
