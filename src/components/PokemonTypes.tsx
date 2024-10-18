import React, { memo } from "react";
import { TYPE_ICONS } from "../lib";
import { PokemonTypesProps } from "../types";

/**
 * PokemonTypes component to display the types of a Pokémon.
 *
 * @param {PokemonTypesProps} props - The props for the component.
 * @returns {JSX.Element} The rendered PokemonTypes component.
 */
const PokemonTypes: React.FC<PokemonTypesProps> = memo(
  ({ types, darkMode }) => {
    return (
      <section
        className={`${
          darkMode ? "bg-gray-800" : "bg-gray-200"
        } p-6 rounded-lg shadow-lg mt-6`}
      >
        <h3 className="text-2xl font-semibold mb-4">Types:</h3>
        <ul className="flex space-x-4">
          {types.map((type) => (
            <li
              key={type.pokemon_v2_type.name}
              className="flex items-center space-x-2 text-lg"
            >
              {TYPE_ICONS[type.pokemon_v2_type.name]}{" "}
              <span>{type.pokemon_v2_type.name}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }
);

export default PokemonTypes;
