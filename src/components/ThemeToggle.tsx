import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { FaSun, FaMoon } from "react-icons/fa"; // Importing icons for light and dark mode

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
      className={`flex items-center justify-center p-2 rounded-full transition duration-300 transform ${
        darkMode
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-300 text-gray-800 hover:bg-gray-400"
      }`}
    >
      {darkMode ? (
        <FaSun className="w-6 h-6 text-yellow-400" /> // Sun icon for light mode
      ) : (
        <FaMoon className="w-6 h-6 text-gray-800" /> // Moon icon for dark mode
      )}
    </button>
  );
};

export default ThemeToggle;
