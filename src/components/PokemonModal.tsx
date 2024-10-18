import React, { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { TbEyeSearch } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import { MdHeight } from "react-icons/md";
import { PokemonModalProps } from "../types";
import { TYPE_ICONS } from "../lib";

/**
 * PokemonModal component to display detailed information about a Pokémon in a modal.
 *
 * @param {PokemonModalProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered PokemonModal component or null if no Pokémon is provided.
 */
const PokemonModal: React.FC<PokemonModalProps> = memo(({ pokemon, onClose, darkMode }) => {
  if (!pokemon) return null;

  /**
   * Renders the types of the Pokémon.
   *
   * @returns {JSX.Element} The rendered types.
   */
  const renderTypes = (): JSX.Element => (
    <div className="flex mb-2">
      {pokemon.pokemon_v2_pokemontypes.map((type) => (
        <div key={type.pokemon_v2_type.name} className="flex items-center mr-2">
          {TYPE_ICONS[type.pokemon_v2_type.name]}
          <span className="font-semibold">{type.pokemon_v2_type.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } rounded-lg p-6 w-80 shadow-lg transform transition-all duration-300`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
          <button
            onClick={onClose}
            className={`rounded-full p-2 transition duration-300 ${
              darkMode
                ? "text-white hover:bg-gray-700"
                : "text-gray-900 hover:bg-gray-200"
            }`}
            aria-label="Close"
          >
            <CgClose />
          </button>
        </div>
        <img
          src={pokemon.pokemon_v2_pokemonsprites[0]?.sprites.front_default || ""}
          alt={pokemon.name}
          className="w-full h-auto rounded-lg mb-4"
        />
        <div className="flex items-center mb-2">
          <MdHeight
            className={`mr-1 ${
              darkMode ? "text-purple-300" : "text-purple-500"
            }`}
          />
          <span className="font-semibold">
            Height: {pokemon.height * 10} cm
          </span>
        </div>
        <h3 className="font-semibold mb-2">Types:</h3>
        {pokemon.pokemon_v2_pokemontypes.length > 0 ? (
          renderTypes()
        ) : (
          <span>No types available</span>
        )}
        <Link to={`/pokemon/${pokemon.id}`}>
          <button className="flex items-center justify-center w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
            <TbEyeSearch className="mr-2" />
            View More
            <FaArrowRight className="ml-2" />
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
});

export default PokemonModal;