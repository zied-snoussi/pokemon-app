import React, { useState, memo } from "react";
import { PokemonItemProps } from "../../types";
import { TYPE_ICONS } from "../../lib";

/**
 * PokemonItem component to display a single Pokémon item.
 *
 * @param {PokemonItemProps} props - The props for the component.
 * @returns {JSX.Element} The rendered PokemonItem component.
 */
const PokemonItem: React.FC<PokemonItemProps> = ({
  pokemon,
  darkMode,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Renders the types of the Pokémon.
   *
   * @returns {JSX.Element} The rendered types.
   */
  const renderTypes = (): JSX.Element => (
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
          {TYPE_ICONS[type.pokemon_v2_type.name]}
          {type.pokemon_v2_type.name}
        </span>
      ))}
    </div>
  );

  const spriteUrl =
    pokemon.pokemon_v2_pokemonsprites.length > 0
      ? pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default
      : "";

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
      {renderTypes()}
    </div>
  );
};

export default memo(PokemonItem);
