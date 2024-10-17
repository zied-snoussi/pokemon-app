import React from "react";

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

  return (
    <div className="pagination flex justify-center items-center mt-4">
      {Array.from({ length: pageNumbers }, (_, i) => (
        <button
          key={i}
          onClick={() => paginate(i + 1)}
          className={`p-2 border rounded mx-1 transition duration-300 ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-blue-500 dark:hover:text-white"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
