import React, { useState, useEffect } from "react";

const ThemeToggler = () => {
  const [theme, setTheme] = useState("light");

  // Update the `data-theme` attribute on the document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      aria-label="theme toggler"
      onClick={toggleTheme}
      className="flex items-center justify-center text-black rounded-full cursor-pointer bg-gray-200 dark:bg-black h-9 w-9 dark:text-white md:h-14 md:w-14"
    >
      {/* Sun icon for light mode */}
      {theme === "light" ? (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 md:h-6 md:w-6"
          fill="currentColor"
        >
          <path d="M12 4a1 1 0 100-2 1 1 0 000 2zm4.22.97a1 1 0 00-.7-1.71l-1.5 1.5a1 1 0 101.42 1.42l1.5-1.5zM6.28 3.26a1 1 0 00-1.71.7l1.5 1.5a1 1 0 001.42-1.42l-1.5-1.5zm11.72 8a4 4 0 11-8 0 4 4 0 018 0zM12 20a1 1 0 100 2 1 1 0 000-2zm5.24-.97a1 1 0 00.7 1.71l1.5-1.5a1 1 0 10-1.42-1.42l-1.5 1.5zM3.26 16.28a1 1 0 00.7-1.71l-1.5 1.5a1 1 0 001.42 1.42l-1.5-1.5zM12 16a1 1 0 100 2 1 1 0 000-2z" />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 md:h-6 md:w-6"
          fill="currentColor"
        >
          <path d="M21.64 13.45A9 9 0 1110.55 2.36a7 7 0 1011.09 11.09z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggler;
