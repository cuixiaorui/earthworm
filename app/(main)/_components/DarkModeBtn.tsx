"use client";

import { useEffect, useState } from "react";

export const DarkModeBtn = () => {
  const [isDark, setIsDark] = useState( ()=>localStorage.getItem("isDarkMode") === "true");
  useEffect(() => {
    const root = window.document.documentElement;
    const initialIsDark = localStorage.getItem("isDarkMode") === "true";
    console.log(initialIsDark);
    root.classList.toggle("dark", initialIsDark);
    setIsDark(initialIsDark);
  });

  const handleThemeChange = () => {
    const root = window.document.documentElement;
    const newIsDark = !isDark;
    root.classList.toggle("dark", newIsDark);
    setIsDark(newIsDark);
    localStorage.setItem("isDarkMode", String(newIsDark));
  };
  // handleThemeChange()
  return (
    <div
      className="inline-block bg-primary text-white rounded-lg px-4 py-2 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer select-none"
      onClick={handleThemeChange}
    >
      切换到{isDark ? "普通" : "暗黑"}模式
    </div>
  );
};
