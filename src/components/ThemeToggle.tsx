import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  interface RootState {
    theme: {
      darkMode: boolean;
    };
  }

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center px-4 py-2 rounded transition duration-300 transform ${
        darkMode
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-300 text-gray-800 hover:bg-gray-400"
      }`}
    >
      <svg
        className={`w-5 h-5 mr-2 transition-transform duration-300 ${
          darkMode ? "transform scale-110" : "transform scale-100"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {darkMode ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1m-16 0H3m15.364-6.364l-.707.707M8.636 15.364l-.707.707M15.364 15.364l.707.707M8.636 8.636l.707-.707M3.5 12c-.827 0-1.5.673-1.5 1.5S2.673 15 3.5 15s1.5-.673 1.5-1.5S4.327 12 3.5 12z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 3v5h5m-6 1h6"
          />
        )}
      </svg>
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
