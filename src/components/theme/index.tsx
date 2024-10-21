import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import { MOON_ICON, SUN_ICON } from "../../lib";
import { RootState } from "../../types";

/**
 * ThemeToggle component to switch between dark and light modes.
 *
 * @returns {JSX.Element} The rendered ThemeToggle component.
 */
const ThemeToggle: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  // Select the dark mode state from the Redux store
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  /**
   * Handles the theme toggle action.
   */
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
      aria-label="Toggle Theme"
    >
      {darkMode ? SUN_ICON : MOON_ICON}
    </button>
  );
};

export default ThemeToggle;
