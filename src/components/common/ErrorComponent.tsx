import React, { memo } from "react";
import { ErrorComponentProps } from "../../types";

/**
 * ErrorComponent to display an error message with a reload button.
 *
 * @param {ErrorComponentProps} props - The props for the component.
 * @returns {JSX.Element} The rendered ErrorComponent.
 */
const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message,
  darkMode,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      } p-4`}
    >
      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="Error"
        className="w-40 mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">
        Oops, something went wrong!
      </h2>
      <p className="text-lg mb-4">{message}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={() => window.location.reload()}
        aria-label="Reload Page"
      >
        Reload Page
      </button>
    </div>
  );
};

export default memo(ErrorComponent);
