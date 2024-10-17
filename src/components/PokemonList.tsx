import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import PokemonItem from "./PokemonItem";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";

interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: Array<{ ability: { name: string; url: string } }>;
  sprites: { front_default: string };
  types: Array<{ type: { name: string; url: string } }>;
}

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pokemonsPerPage] = useState<number>(10);

  interface RootState {
    theme: {
      darkMode: boolean;
    };
  }

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=50"
        );
        const pokemonData = await Promise.all(
          response.data.results.map((pokemon: { url: string }) =>
            axios.get(pokemon.url).then((res) => res.data)
          )
        );
        setPokemons(pokemonData);
        setLoading(false);
      } catch {
        setError("Failed to fetch Pokémon data.");
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div
      className={`pokemon-list p-4 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearch}
        className={`border p-2 rounded mb-4 w-full max-w-md mx-auto shadow-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-300 ${
          darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
        }`}
      />
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
          <p className="ml-4 text-gray-700">Loading...</p>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentPokemons.map((pokemon) => (
            <PokemonItem
              key={pokemon.id}
              pokemon={pokemon}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}
      {/* Pagination component */}
      <Pagination
        totalPokemons={filteredPokemons.length}
        pokemonsPerPage={pokemonsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default PokemonList;
