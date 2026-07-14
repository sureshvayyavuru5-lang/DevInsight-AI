import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Navbar.css";

function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${darkMode ? "dark-navbar" : ""}`}>
      <div className="logo">
        <h2>🚀 DevInsight AI</h2>
      </div>

      <div className="nav-profile">
        <span>👨‍💻 Developer Analytics</span>

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;