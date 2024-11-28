import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useLayout } from "../context/layoutContext";

const AppLayout = ({ children }) => {
  const { isSidebarOpen, toggleSidebar, closeSidebar, darkMode, toggleTheme } =
    useLayout();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        onMenuClick={toggleSidebar}
      />

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
