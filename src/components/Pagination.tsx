import React, { memo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PaginationProps } from "../types";
import { THREE_DOTS_ICON } from "../lib";

/**
 * Pagination component to navigate through Pokémon pages.
 *
 * @param {PaginationProps} props - The pagination props.
 * @returns {JSX.Element} The rendered Pagination component.
 */
const Pagination: React.FC<PaginationProps> = ({
  totalPokemons,
  pokemonsPerPage,
  currentPage,
  paginate,
  darkMode,
}) => {
  const pageNumbers = Math.ceil(totalPokemons / pokemonsPerPage);

  /**
   * Handles the previous page button click.
   */
  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  /**
   * Handles the next page button click.
   */
  const handleNext = () => {
    if (currentPage < pageNumbers) {
      paginate(currentPage + 1);
    }
  };

  /**
   * Renders the page numbers with ellipsis for large page ranges.
   *
   * @returns {JSX.Element[]} The rendered page numbers.
   */
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
              ? "bg-blue-500 text-white"
              : darkMode
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-800"
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
          {THREE_DOTS_ICON}
        </span>
      );
    }

    if (endPage < pageNumbers) {
      pages.push(
        <span key="end-ellipsis" className="p-2">
          {THREE_DOTS_ICON}
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

export default memo(Pagination);
