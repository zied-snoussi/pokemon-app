import React, { memo } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchInputProps } from "../../types";

/**
 * SearchInput component for searching Pokémon.
 *
 * @param {SearchInputProps} props - The props for the component.
 * @returns {JSX.Element} The rendered SearchInput component.
 */
const SearchInput: React.FC<SearchInputProps> = memo(
  ({ searchTerm, onSearch, darkMode }) => {
    return (
      <div className="relative w-full max-w-md mx-auto">
        <FaSearch
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        />
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className={`border pl-10 p-2 rounded w-full shadow-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-300 ${
            darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
          }`}
        />
      </div>
    );
  }
);

export default SearchInput;
