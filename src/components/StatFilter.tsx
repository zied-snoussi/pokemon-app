import React from "react";
import { FaFistRaised } from "react-icons/fa";
import { StatFilterProps } from "../types";

/**
 * StatFilter component for filtering Pokémon by a specific stat value.
 *
 * @param {StatFilterProps} props - The props for the component.
 * @returns {JSX.Element} The rendered StatFilter component.
 */
const StatFilter: React.FC<StatFilterProps> = ({
  value,
  onChange,
  darkMode,
}) => {
  /**
   * Handles the change event for the input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ stat: "attack", value: +e.target.value });
  };

  return (
    <div className="relative w-fit">
      <FaFistRaised
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      />
      <input
        type="number"
        placeholder="Filter by Attack Value"
        value={value}
        onChange={handleChange}
        className={`border pl-10 p-2 rounded w-[120px] shadow-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-300 ${
          darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
        }`}
      />
    </div>
  );
};

export default React.memo(StatFilter);
