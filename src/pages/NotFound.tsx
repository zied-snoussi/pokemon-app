import React from "react";
import { Link } from "react-router-dom";

/**
 * NotFound component to display a 404 error message.
 *
 * @returns {JSX.Element} The rendered NotFound component.
 */
const NotFound: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <img
        src="/not-found.svg"
        alt="Page Not Found"
        className="w-64 h-64 mb-8"
      />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
