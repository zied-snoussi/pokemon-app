import React, { memo } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./";
import { PokemonHeaderProps } from "../types";

/**
 * PokemonHeader component to display the header and image of a Pokémon.
 *
 * @param {PokemonHeaderProps} props - The props for the component.
 * @returns {JSX.Element} The rendered PokemonHeader component.
 */
const PokemonHeader: React.FC<PokemonHeaderProps> = memo(
  ({ name, spriteUrl, darkMode }) => {
    const navigate = useNavigate();

    return (
      <>
        <header className="flex items-center justify-between mb-6">
          <button
            className={`flex items-center transition-colors duration-200 ${
              darkMode
                ? "text-white hover:text-gray-200"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => navigate("/")}
            aria-label="Back to Home"
          >
            <FaArrowLeft className="h-5 w-5 mr-1" />
            Back to Home
          </button>
          <ThemeToggle />
        </header>

        <article className="flex flex-col items-center mb-8">
          <h2 className="text-4xl font-bold capitalize mb-4">{name}</h2>
          <img
            src={spriteUrl}
            alt={name}
            className="w-48 h-48 rounded-full border-4 border-blue-500 shadow-lg mb-4 transition-transform duration-300 hover:scale-105"
          />
        </article>
      </>
    );
  }
);

export default PokemonHeader;
