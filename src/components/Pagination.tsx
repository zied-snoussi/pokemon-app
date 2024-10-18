import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  totalPokemons: number;
  pokemonsPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

/**
 * Pagination component to navigate through Pokémon pages.
 *
 * @param {PaginationProps} props - The pagination props
 */
const Pagination: React.FC<PaginationProps> = ({
  totalPokemons,
  pokemonsPerPage,
  currentPage,
  paginate,
}) => {
  const pageNumbers = Math.ceil(totalPokemons / pokemonsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className="pagination flex justify-center items-center mt-4 space-x-2">
      <button
        onClick={handlePrevious}
        className={`p-2 border rounded-full transition duration-300 ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-blue-500 dark:hover:text-white"
        }`}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <FaChevronLeft />
      </button>
      {Array.from({ length: pageNumbers }, (_, i) => (
        <button
          key={i}
          onClick={() => paginate(i + 1)}
          className={`p-2 border rounded-full transition duration-300 ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-blue-500 dark:hover:text-white"
          }`}
          aria-label={`Page ${i + 1}`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={handleNext}
        className={`p-2 border rounded-full transition duration-300 ${
          currentPage === pageNumbers
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-blue-500 dark:hover:text-white"
        }`}
        disabled={currentPage === pageNumbers}
        aria-label="Next Page"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
