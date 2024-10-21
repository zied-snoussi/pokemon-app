import React, { memo } from "react";
import { FaSort } from "react-icons/fa";
import { SORT_OPTIONS } from "../../lib";
import { SortDropdownProps } from "../../types";

/**
 * SortDropdown component for sorting Pokémon by various criteria.
 *
 * @param {SortDropdownProps} props - The props for the component.
 * @returns {JSX.Element} The rendered SortDropdown component.
 */
const SortDropdown: React.FC<SortDropdownProps> = memo(
  ({ sortCriteria, onChange, darkMode }) => {
    return (
      <div className="relative w-fit">
        <FaSort
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        />
        <select
          value={sortCriteria}
          onChange={(e) => onChange(e.target.value)}
          className={`border pl-10 p-2 rounded w-full shadow-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-300 ${
            darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
          }`}
          aria-label="Sort Pokémon"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default SortDropdown;
