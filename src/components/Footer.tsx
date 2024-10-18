import React, { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types";

/**
 * Footer component to display the footer with a message and a link.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer: React.FC = (): JSX.Element => {
  // Select the dark mode state from the Redux store
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <footer className={`text-center mt-8 ${darkMode ? "text-gray-300" : ""}`}>
      <p>
        Made with{" "}
        <span role="img" aria-label="Heart">
          ❤️
        </span>{" "}
        by{" "}
        <a
          href="https://github.com/zied-snoussi"
          target="_blank"
          rel="noopener noreferrer"
          className={`${darkMode ? "text-blue-400" : "text-blue-600"}`}
        >
          Zied SNOUSSI
        </a>
      </p>
    </footer>
  );
};

export default memo(Footer);
