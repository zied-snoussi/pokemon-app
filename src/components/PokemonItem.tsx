import React, { useState } from "react";
import {
  FaFire,
  FaWater,
  FaLeaf,
  FaBolt,
  FaGhost,
  FaDragon,
  FaBug,
  FaFistRaised,
} from "react-icons/fa"; // Importing icons for types
import { GiMountains, GiWeight } from "react-icons/gi"; // Importing icons for weight and height
import { MdStar } from "react-icons/md"; // Importing icon for base experience

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

interface PokemonItemProps {
  pokemon: Pokemon;
  darkMode: boolean;
  onSelect: (pokemon: Pokemon) => void; // Callback function to handle selection
}

const PokemonItem: React.FC<PokemonItemProps> = ({
  pokemon,
  darkMode,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to get the appropriate icon based on the Pokémon type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "fire":
        return <FaFire className="mr-1 text-red-500" />;
      case "water":
        return <FaWater className="mr-1 text-blue-500" />;
      case "grass":
        return <FaLeaf className="mr-1 text-green-500" />;
      case "electric":
        return <FaBolt className="mr-1 text-yellow-500" />;
      case "ghost":
        return <FaGhost className="mr-1 text-purple-500" />;
      case "dragon":
        return <FaDragon className="mr-1 text-indigo-500" />;
      case "bug":
        return <FaBug className="mr-1 text-green-700" />;
      case "fighting":
        return <FaFistRaised className="mr-1 text-red-700" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`pokemon-item ${
        darkMode ? "bg-gray-800 shadow-gray-900" : "bg-white shadow-lg"
      } shadow-lg rounded-lg p-6 m-4 transform transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 relative cursor-pointer`}
      role="article"
      aria-labelledby={`pokemon-${pokemon.id}`}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false
      onClick={() => onSelect(pokemon)} // Handle click to select the Pokémon
    >
      {isHovered && (
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5))`, // Gradient effect
            opacity: 0.5, // Adjust opacity as needed
          }}
        />
      )}

      <h3
        id={`pokemon-${pokemon.id}`}
        className={`text-2xl font-bold text-center ${
          darkMode ? "text-white" : "text-gray-800"
        } mb-2`}
      >
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h3>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-32 h-32 object-cover mx-auto mb-4 transition-transform duration-500 transform hover:scale-110"
      />
      <div className="flex items-center mb-2">
        <MdStar
          className={`mr-1 ${darkMode ? "text-yellow-400" : "text-gray-600"}`}
        />
        <span
          className={`text-gray-600 ${darkMode ? "dark:text-gray-300" : ""}`}
        >
          Base Experience:{" "}
          <span className="font-semibold">{pokemon.base_experience}</span>
        </span>
      </div>
      <div className="flex items-center mb-2">
        <GiMountains
          className={`mr-1 ${darkMode ? "text-green-500" : "text-gray-600"}`}
        />
        <span
          className={`text-gray-600 ${darkMode ? "dark:text-gray-300" : ""}`}
        >
          Height: <span className="font-semibold">{pokemon.height}</span>
        </span>
      </div>
      <div className="flex items-center mb-2">
        <GiWeight
          className={`mr-1 ${darkMode ? "text-blue-500" : "text-gray-600"}`}
        />
        <span
          className={`text-gray-600 ${darkMode ? "dark:text-gray-300" : ""}`}
        >
          Weight: <span className="font-semibold">{pokemon.weight}</span>
        </span>
      </div>

      {/* Abilities with badges */}
      <div className="flex flex-wrap mb-2">
        <span
          className={`text-sm ${
            darkMode ? "dark:text-gray-300" : "text-gray-600"
          } mr-2`}
        >
          Abilities:
        </span>
        {pokemon.abilities.map((ability) => (
          <span
            key={ability.ability.name}
            className={`${
              darkMode ? "bg-blue-600 text-white" : "bg-blue-200 text-blue-800"
            } text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-2 transition duration-300 transform hover:bg-blue-300 dark:hover:bg-blue-500 cursor-pointer`}
            role="button"
            aria-label={`Ability: ${ability.ability.name}`}
          >
            {ability.ability.name}
          </span>
        ))}
      </div>

      {/* Types with icons */}
      <div className="flex flex-wrap">
        <span
          className={`text-sm ${
            darkMode ? "dark:text-gray-300" : "text-gray-600"
          } mr-2 flex items-center`}
        >
          Type:
        </span>
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className={`${
              darkMode
                ? "bg-green-600 text-white"
                : "bg-green-200 text-green-800"
            } flex items-center text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-2 transition duration-300 transform hover:bg-green-300 dark:hover:bg-green-500 cursor-pointer`}
            role="button"
            aria-label={`Type: ${type.type.name}`}
          >
            {getTypeIcon(type.type.name)}
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonItem;
