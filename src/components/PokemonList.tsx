import React, { useState, Suspense } from "react";
import { useQuery } from "@apollo/client";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import PokemonModal from "./PokemonModal";
import TypeDropdown from "./TypeDropdown";
import { FaSearch } from "react-icons/fa";
import Loading from "./Loading";
import { GET_POKEMONS } from "../graphql/queries";

const PokemonItem = React.lazy(() => import("./PokemonItem"));

interface Sprite {
  sprites: {
    front_default: string;
  };
}

interface Type {
  pokemon_v2_type: {
    name: string;
  };
  type_id: number;
}

interface Stat {
  pokemon_v2_stat: {
    name: string;
  };
  base_stat: number;
  stat_id: number;
}

interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  pokemon_v2_pokemonsprites: Sprite[];
  pokemon_v2_pokemontypes: Type[];
  pokemon_v2_pokemonstats: Stat[];
}

const PokemonList: React.FC = () => {
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

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 50 }, // You can adjust the limit as needed
  });

  const pokemons: Pokemon[] = data ? data.pokemon_v2_pokemon : [];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesType =
      selectedType === "" ||
      pokemon.pokemon_v2_pokemontypes.some(
        (type) => type.pokemon_v2_type.name === selectedType
      );

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
      {pokemonSelected !== null ? (
        <PokemonModal
          onClose={onClose}
          pokemon={pokemonSelected}
          darkMode={darkMode}
        />
      ) : null}
      <div
        className={`pokemon-list p-4 ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="flex justify-between w-full items-center mb-4 left-0">
          <div className="relative w-full max-w-md mx-auto">
            <FaSearch
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            />
            <input
              type="text"
              placeholder="Search Pokémon"
              value={searchTerm}
              onChange={handleSearch}
              className={`border pl-10 p-2 rounded w-full shadow-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-300 ${
                darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
              }`}
            />
          </div>
          <div className="ml-10">
            <ThemeToggle />
          </div>
        </div>
        <TypeDropdown
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          darkMode={darkMode}
        />

        {loading ? (
          <Loading />
        ) : error ? (
          <p className="text-center text-red-500">{error.message}</p>
        ) : (
          <Suspense fallback={<Loading />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentPokemons.map((pokemon) => (
                <PokemonItem
                  key={pokemon.id}
                  pokemon={pokemon}
                  darkMode={darkMode}
                  onSelect={() => onSelectPokemon(pokemon)}
                />
              ))}
            </div>
          </Suspense>
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
