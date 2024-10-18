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
  FaSkullCrossbones,
} from "react-icons/fa";

// Define the exact types based on the provided structure
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
    const icons: { [key: string]: JSX.Element } = {
      fire: <FaFire className="mr-1 text-red-500" />,
      water: <FaWater className="mr-1 text-blue-500" />,
      grass: <FaLeaf className="mr-1 text-green-500" />,
      electric: <FaBolt className="mr-1 text-yellow-500" />,
      ghost: <FaGhost className="mr-1 text-purple-500" />,
      dragon: <FaDragon className="mr-1 text-indigo-500" />,
      bug: <FaBug className="mr-1 text-green-700" />,
      fighting: <FaFistRaised className="mr-1 text-red-700" />,
      poison: <FaSkullCrossbones className="mr-1 text-purple-500" />,
    };
    return icons[type] || null;
  };

  // Rendering types
  const renderTypes = () => (
    <div className="flex flex-wrap">
      {pokemon.pokemon_v2_pokemontypes.map((type) => (
        <span
          key={type.pokemon_v2_type.name}
          className={`${
            darkMode ? "bg-red-600 text-white" : "bg-green-200 text-green-800"
          } flex items-center text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-2 transition duration-300 transform hover:bg-green-300 dark:hover:bg-green-500 cursor-pointer`}
          role="button"
          aria-label={`Type: ${type.pokemon_v2_type.name}`}
        >
          {getTypeIcon(type.pokemon_v2_type.name)}
          {type.pokemon_v2_type.name}
        </span>
      ))}
    </div>
  );

  // Get the front_default sprite URL from the array
  const spriteUrl =
    pokemon.pokemon_v2_pokemonsprites.length > 0
      ? pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default
      : ""; // Fallback if no sprites are available

  return (
    <div
      className={`pokemon-item ${
        darkMode ? "bg-gray-800 shadow-gray-900" : "bg-white shadow-lg"
      } shadow-lg rounded-lg p-6 m-4 transform transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 relative cursor-pointer`}
      role="article"
      aria-labelledby={`pokemon-${pokemon.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(pokemon)}
    >
      {isHovered && (
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5))`,
            opacity: 0.5,
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
        src={spriteUrl}
        alt={pokemon.name}
        className="w-32 h-32 object-cover mx-auto mb-4 transition-transform duration-500 transform hover:scale-110"
      />

      {renderTypes()} {/* Render types only */}
    </div>
  );
};

export default PokemonItem;
