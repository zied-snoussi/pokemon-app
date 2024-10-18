import React, { memo } from "react";

/**
 * Header component to display the application header with an icon and title.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
const Header: React.FC = (): JSX.Element => {
  return (
    <header>
      <div className="flex flex-col items-center mb-8">
        <img
          src="/pokemon-icon.svg"
          alt="Pokémon Icon representing the Pokémon list application"
          className="w-16 h-16"
        />
        <h1 className="text-4xl font-bold text-center">Pokémon List</h1>
      </div>
    </header>
  );
};

export default memo(Header);