import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link
import {
  FaBolt,
  FaBug,
  FaDragon,
  FaFire,
  FaFistRaised,
  FaGhost,
  FaLeaf,
  FaStar,
  FaWater,
  FaArrowRight, // Import the arrow icon
} from "react-icons/fa";
import { TbEyeSearch } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import { GiWeight } from "react-icons/gi";
import { MdHeight } from "react-icons/md";

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
            className="text-gray-600 hover:text-gray-800"
          >
            <CgClose className="h-8 w-8" />
          </button>
        </div>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 mb-4 mx-auto rounded-full border border-gray-200 shadow"
        />
        <div className="flex items-center mb-2">
          <FaStar
            className={`mr-1 ${
              darkMode ? "text-yellow-400" : "text-yellow-500"
            }`}
          />
          <span className="font-semibold">
            Base Experience: {pokemon.base_experience}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <MdHeight
            className={`mr-1 ${darkMode ? "text-green-300" : "text-green-500"}`}
          />
          <span className="font-semibold">Height: {pokemon.height} dm</span>
        </div>
        <div className="flex items-center mb-2">
          <GiWeight
            className={`mr-1 ${darkMode ? "text-blue-300" : "text-blue-500"}`}
          />
          <span className="font-semibold">Weight: {pokemon.weight} hg</span>
        </div>
        <h3 className="mt-4 font-semibold">Abilities:</h3>
        <ul className="list-disc ml-4">
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name} className="flex items-center">
              <TbEyeSearch className={`text-purple-500 mr-1`} />
              {ability.ability.name}
            </li>
          ))}
        </ul>
        <h3 className="mt-4 font-semibold">Types:</h3>
        <ul className="list-disc ml-4">
          {pokemon.types.map((type) => (
            <li key={type.type.name} className="flex items-center">
              {type.type.name === "water" && (
                <FaWater
                  className={`mr-1 ${
                    darkMode ? "text-blue-400" : "text-blue-500"
                  }`}
                />
              )}
              {type.type.name === "grass" && (
                <FaLeaf
                  className={`mr-1 ${
                    darkMode ? "text-green-400" : "text-green-500"
                  }`}
                />
              )}
              {type.type.name === "fire" && (
                <FaFire
                  className={`mr-1 ${
                    darkMode ? "text-red-400" : "text-red-500"
                  }`}
                />
              )}
              {type.type.name === "electric" && (
                <FaBolt
                  className={`mr-1 ${
                    darkMode ? "text-yellow-400" : "text-yellow-500"
                  }`}
                />
              )}
              {type.type.name === "ghost" && (
                <FaGhost
                  className={`mr-1 ${
                    darkMode ? "text-purple-400" : "text-purple-500"
                  }`}
                />
              )}
              {type.type.name === "dragon" && (
                <FaDragon
                  className={`mr-1 ${
                    darkMode ? "text-indigo-400" : "text-indigo-500"
                  }`}
                />
              )}
              {type.type.name === "bug" && (
                <FaBug
                  className={`mr-1 ${
                    darkMode ? "text-green-600" : "text-green-700"
                  }`}
                />
              )}
              {type.type.name === "fighting" && (
                <FaFistRaised
                  className={`mr-1 ${
                    darkMode ? "text-red-600" : "text-red-700"
                  }`}
                />
              )}
              {type.type.name}
            </li>
          ))}
        </ul>

        {/* Button to view more details */}
        <Link
          to={`/pokemon/${pokemon.id}`}
          className="mt-4 inline-flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded text-center hover:bg-blue-600 transition duration-300"
        >
          More Details
          <FaArrowRight className="ml-2" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default PokemonModal;
