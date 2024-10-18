import React from "react";
import { BsThreeDots } from "react-icons/bs";
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

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
    let endPage = Math.min(pageNumbers, currentPage + halfMaxPagesToShow);

    if (currentPage <= halfMaxPagesToShow) {
      endPage = Math.min(pageNumbers, maxPagesToShow);
    }

    if (currentPage + halfMaxPagesToShow >= pageNumbers) {
      startPage = Math.max(1, pageNumbers - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`p-2 border rounded-full transition duration-300 ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-blue-500 dark:hover:text-white"
          }`}
          aria-label={`Page ${i}`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pages.unshift(
        <span key="start-ellipsis" className="p-2">
          <BsThreeDots className="text-gray-500" />
        </span>
      );
    }

    if (endPage < pageNumbers) {
      pages.push(
        <span key="end-ellipsis" className="p-2">
          <BsThreeDots className="text-gray-500" />
        </span>
      );
    }

    return pages;
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
      {renderPageNumbers()}
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
