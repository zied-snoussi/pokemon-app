import React, { useState } from "react";
import { FILTER_ICON, TYPES_POKEMON } from "../lib";
import { TypeDropdownProps } from "../types";

/**
 * TypeDropdown component for filtering Pokémon by type.
 *
 * @param {TypeDropdownProps} props - The props for the component.
 * @returns {JSX.Element} The rendered TypeDropdown component.
 */
const TypeDropdown: React.FC<TypeDropdownProps> = ({
  selectedType,
  onTypeChange,
  darkMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggles the dropdown menu.
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Handles the type selection.
   *
   * @param {string} type - The selected type.
   */
  const handleTypeSelect = (type: string) => {
    onTypeChange(type);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center border p-2 rounded shadow-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-300 ${
          darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
        }`}
      >
        {selectedType === "" ? (
          <>
            {FILTER_ICON}
            Filter by Type
          </>
        ) : (
          <div className="flex items-center space-x-2">
            {TYPES_POKEMON.find((type) => type.value === selectedType)?.icon}
            <div>
              {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
            </div>
          </div>
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } ring-1 ring-black ring-opacity-5`}
        >
          <div className="py-1">
            {TYPES_POKEMON.map((type) => (
              <div
                key={type.value}
                onClick={() => handleTypeSelect(type.value)}
                className={`flex items-center px-4 py-2 text-sm cursor-pointer transition ${
                  darkMode
                    ? "text-white hover:bg-gray-700"
                    : "text-gray-800 hover:bg-gray-200"
                }`}
              >
                {type.icon}
                <span className="ml-2">{type.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TypeDropdown);
