import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_POKEMONS } from "../graphql/queries";
import { Pokemon, RootState } from "../types";
import {
  ErrorComponent,
  Loading,
  Pagination,
  PokemonGrid,
  PokemonModal,
  SearchInput,
  SortDropdown,
  StatFilter,
  ThemeToggle,
  TypeDropdown,
} from "./";

/**
 * PokemonList component to display a list of Pokémon with various filters and sorting options.
 *
 * @returns {JSX.Element} The rendered PokemonList component.
 */
const PokemonList: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pokemonsPerPage] = useState<number>(12);
  const [selectedType, setSelectedType] = useState<string>("");
  const [statFilter, setStatFilter] = useState<{ stat: string; value: number }>(
    {
      stat: "attack",
      value: 0,
    }
  );
  const [sortCriteria, setSortCriteria] = useState<string>("name");
  const [pokemonSelected, setPokemonSelected] = useState<Pokemon | null>(null);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 100 },
  });

  const pokemons: Pokemon[] = data ? data.pokemon_v2_pokemon : [];

  /**
   * Filters the Pokémon list based on the selected type, search term, and stat filter.
   *
   * @param {Pokemon} pokemon - The Pokémon to filter.
   * @returns {boolean} Whether the Pokémon matches the filters.
   */
  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesType =
      selectedType === "" ||
      pokemon.pokemon_v2_pokemontypes.some(
        (type) => type.pokemon_v2_type.name === selectedType
      );

    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStat =
      statFilter.value === 0 ||
      pokemon.pokemon_v2_pokemonstats.some(
        (stat) =>
          stat.pokemon_v2_stat.name === statFilter.stat &&
          stat.base_stat > statFilter.value
      );

    return matchesType && matchesSearch && matchesStat;
  });

  /**
   * Sorts the filtered Pokémon list based on the selected sorting criteria.
   *
   * @param {Pokemon} a - The first Pokémon to compare.
   * @param {Pokemon} b - The second Pokémon to compare.
   * @returns {number} The comparison result.
   */
  const sortedPokemons = filteredPokemons.sort((a, b) => {
    if (sortCriteria === "name") {
      return a.name.localeCompare(b.name);
    } else {
      const statA =
        a.pokemon_v2_pokemonstats.find(
          (stat) => stat.pokemon_v2_stat.name === sortCriteria
        )?.base_stat || 0;
      const statB =
        b.pokemon_v2_pokemonstats.find(
          (stat) => stat.pokemon_v2_stat.name === sortCriteria
        )?.base_stat || 0;
      return statB - statA;
    }
  });

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = sortedPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const onSelectPokemon = (pokemon: Pokemon) => setPokemonSelected(pokemon);
  const onClose = () => setPokemonSelected(null);

  return (
    <>
      {pokemonSelected && (
        <PokemonModal
          onClose={onClose}
          pokemon={pokemonSelected}
          darkMode={darkMode}
        />
      )}
      <div
        className={`pokemon-list p-4 ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="flex justify-between w-full items-center mb-4">
          <SearchInput
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            darkMode={darkMode}
          />
          <div className="ml-10">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex justify-between w-full items-center mb-4">
          <TypeDropdown
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            darkMode={darkMode}
          />
          <StatFilter
            value={statFilter.value}
            onChange={setStatFilter}
            darkMode={darkMode}
          />
        </div>
        <div className="flex justify-between w-full items-center mb-4">
          <SortDropdown
            sortCriteria={sortCriteria}
            onChange={setSortCriteria}
            darkMode={darkMode}
          />
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorComponent
            message="Failed to load Pokémon data. Please try again later."
            darkMode={darkMode}
          />
        ) : (
          <>
            <PokemonGrid
              pokemons={currentPokemons}
              darkMode={darkMode}
              onSelectPokemon={onSelectPokemon}
            />
            <Pagination
              pokemonsPerPage={pokemonsPerPage}
              totalPokemons={filteredPokemons.length}
              currentPage={currentPage}
              paginate={paginate}
              darkMode={darkMode}
            />
          </>
        )}
      </div>
    </>
  );
};

export default PokemonList;
