import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBolt,
  FaBug,
  FaDragon,
  FaFire,
  FaFistRaised,
  FaGhost,
  FaLeaf,
  FaWater,
  FaArrowRight,
  FaSkullCrossbones,
} from "react-icons/fa";
import { TbEyeSearch } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import { MdHeight } from "react-icons/md";

interface Sprite {
  sprites: {
    front_default: string;
  };
}

interface Type {
  pokemon_v2_type: {
    name: string;
  };
}

interface Stat {
  pokemon_v2_stat: {
    name: string;
  };
  base_stat: number;
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

interface PokemonModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
  darkMode: boolean;
}

const PokemonModal: React.FC<PokemonModalProps> = ({
  pokemon,
  onClose,
  darkMode,
}) => {
  if (!pokemon) return null;

  const typeIcons: { [key: string]: JSX.Element } = {
    water: (
      <FaWater
        className={`mr-1 ${darkMode ? "text-blue-400" : "text-blue-500"}`}
      />
    ),
    grass: (
      <FaLeaf
        className={`mr-1 ${darkMode ? "text-green-400" : "text-green-500"}`}
      />
    ),
    fire: (
      <FaFire
        className={`mr-1 ${darkMode ? "text-red-400" : "text-red-500"}`}
      />
    ),
    electric: (
      <FaBolt
        className={`mr-1 ${darkMode ? "text-yellow-400" : "text-yellow-500"}`}
      />
    ),
    ghost: (
      <FaGhost
        className={`mr-1 ${darkMode ? "text-purple-400" : "text-purple-500"}`}
      />
    ),
    dragon: (
      <FaDragon
        className={`mr-1 ${darkMode ? "text-indigo-400" : "text-indigo-500"}`}
      />
    ),
    bug: (
      <FaBug
        className={`mr-1 ${darkMode ? "text-green-600" : "text-green-700"}`}
      />
    ),
    fighting: (
      <FaFistRaised
        className={`mr-1 ${darkMode ? "text-red-600" : "text-red-700"}`}
      />
    ),
    poison: (
      <FaSkullCrossbones
        className={`mr-1 ${darkMode ? "text-purple-400" : "text-purple-500"}`}
      />
    ),
  };

  const renderTypes = () => (
    <div className="flex mb-2">
      {pokemon.pokemon_v2_pokemontypes.map((type) => (
        <div key={type.pokemon_v2_type.name} className="flex items-center mr-2">
          {typeIcons[type.pokemon_v2_type.name]}
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
          src={
            pokemon.pokemon_v2_pokemonsprites[0]?.sprites.front_default || ""
          }
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
};

export default PokemonModal;
