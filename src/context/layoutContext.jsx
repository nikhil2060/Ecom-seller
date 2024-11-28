import React, { createContext, useContext, useState, useEffect } from "react";

const LayoutContext = createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
  closeSidebar: () => {},
  darkMode: false,
  toggleTheme: () => {},
});

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};

const LayoutProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Update localStorage and document class when darkMode changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const value = {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    darkMode,
    toggleTheme,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;
