import React, { useState } from "react";

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
}

/**
 * PokemonItem component displays individual Pokémon details.
 *
 * @param {PokemonItemProps} props - The Pokémon item props
 */
const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon, darkMode }) => {
  // State to manage hover
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`pokemon-item ${
        darkMode ? "bg-gray-800 shadow-gray-900" : "bg-white shadow-lg"
      } shadow-lg rounded-lg p-6 m-4 transform transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 relative`}
      role="article"
      aria-labelledby={`pokemon-${pokemon.id}`}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false
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
      <p
        className={`text-gray-600 ${
          darkMode ? "dark:text-gray-300" : "text-gray-600"
        }`}
      >
        Base Experience:{" "}
        <span className="font-semibold">{pokemon.base_experience}</span>
      </p>
      <p
        className={`text-gray-600 ${
          darkMode ? "dark:text-gray-300" : "text-gray-600"
        }`}
      >
        Height: <span className="font-semibold">{pokemon.height}</span>
      </p>
      <p
        className={`text-gray-600 ${
          darkMode ? "dark:text-gray-300" : "text-gray-600"
        }`}
      >
        Weight: <span className="font-semibold">{pokemon.weight}</span>
      </p>

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

      {/* Types with badges */}
      <div className="flex flex-wrap">
        <span
          className={`text-sm ${
            darkMode ? "dark:text-gray-300" : "text-gray-600"
          } mr-2`}
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
            } text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-2 transition duration-300 transform hover:bg-green-300 dark:hover:bg-green-500 cursor-pointer`}
            role="button"
            aria-label={`Type: ${type.type.name}`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonItem;
