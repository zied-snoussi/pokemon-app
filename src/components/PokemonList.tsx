import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import PokemonModal from "./PokemonModal";
import TypeDropdown from "./TypeDropdown";
import { FaSearch } from "react-icons/fa";
const PokemonItem = React.lazy(() => import("./PokemonItem"));

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
  const [selectedType, setSelectedType] = useState<string>("");
  const [pokemonSelected, setPokemonSelected] = useState<Pokemon | null>(null);

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

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesType =
      selectedType === "" ||
      pokemon.types.some((type) => type.type.name === selectedType);

    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const onSelectPokemon = (pokemon: Pokemon) => {
    setPokemonSelected(pokemon);
  };

  const onClose = () => {
    setPokemonSelected(null);
  };

  return (
    <>
      <PokemonModal
        onClose={onClose}
        pokemon={pokemonSelected}
        darkMode={darkMode}
      />
      <div
        className={`pokemon-list p-4 ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="flex flex-1 justify-between w-full items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <FaSearch
                className={`mr-2 ${darkMode ? "text-white" : "text-gray-800"}`}
              />
              <input
                type="text"
                placeholder="Search Pokémon"
                value={searchTerm}
                onChange={handleSearch}
                className={`border p-2 rounded w-full max-w-md mx-auto shadow-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-300 ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                }`}
              />
            </div>
            <TypeDropdown
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              darkMode={darkMode}
            />
          </div>
          <ThemeToggle />
        </div>

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
                onSelect={onSelectPokemon}
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
    </>
  );
};

export default PokemonList;
