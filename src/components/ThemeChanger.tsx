"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  // unable to determind theme from server, so it will cause hydration mismatch
  // to fix this error, use this approach below
  // https://www.npmjs.com/package/next-themes?activeTab=readme#avoid-hydration-mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  function handleTheme() {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }
  return (
    <div>
      <div>
        <button
          className="p-[2px] text-lg text-indigo-500 focus:outline-none"
          type="button"
          aria-label="开关深色模式"
          onClick={handleTheme}
        >
          {theme === "light" ? (
            <svg
              viewBox="0 0 24 24"
              width="1.2em"
              height="1.2em"
              className="icon"
            >
              <path
                fill="currentColor"
                d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1-9 0Zm11.394-5.834a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75Zm-3.916 6.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18Zm-4.242-.697a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12Zm.697-4.243a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"
              ></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="1.2em"
              height="1.2em"
              className="icon"
            >
              <path
                fill="currentColor"
                d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9a8.97 8.97 0 0 0 3.463-.69a.75.75 0 0 1 .981.98a10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5c0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
              ></path>
            </svg>
          )}
        </button>
      </div>
      <div className="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity hover:bg-blue-800">
        <span className="tooltip">
          {theme === "light" ? "浅色模式" : "深色模式"}
        </span>
      </div>
    </div>
  );
};

export default ThemeChanger;
