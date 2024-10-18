import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../types";
import { GET_POKEMON_DETAILS } from "../graphql/queries";
import {
  Loading,
  PokemonHeader,
  PokemonStats,
  PokemonTypes,
} from "../components";

/**
 * Component to display detailed information about a specific Pokémon.
 *
 * @returns {JSX.Element} The rendered Pokémon details component.
 */
const PokemonDetails: React.FC = (): JSX.Element => {
  // Get the dark mode state from the Redux store
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  // Get the Pokémon ID from the URL parameters
  const { id } = useParams<{ id: string }>();

  // Fetch Pokémon details using the provided ID
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id: parseInt(id!, 10) },
  });

  // Display loading indicator while fetching data
  if (loading) return <Loading />;

  // Display error message if there is an error fetching data
  if (error) return <p className="text-red-500">{error.message}</p>;

  // Get the Pokémon data from the fetched data
  const pokemon = data?.pokemon_v2_pokemon_by_pk;

  // Display message if Pokémon is not found
  if (!pokemon) {
    return <p className="text-red-500">Pokémon not found.</p>;
  }

  // Get the sprite URL for the Pokémon
  const spriteUrl =
    pokemon.pokemon_v2_pokemonsprites[0]?.sprites.other["official-artwork"]
      .front_default;

  return (
    <motion.section
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PokemonHeader
        name={pokemon.name}
        spriteUrl={spriteUrl}
        darkMode={darkMode}
      />
      <PokemonStats
        name={pokemon.name}
        stats={pokemon.pokemon_v2_pokemonstats}
        darkMode={darkMode}
      />
      <PokemonTypes
        types={pokemon.pokemon_v2_pokemontypes}
        darkMode={darkMode}
      />
    </motion.section>
  );
};

export default PokemonDetails;
