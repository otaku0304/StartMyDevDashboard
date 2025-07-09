import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // 👈 import Link
import logo from "../assets/logo.png";
import githubIcon from "../assets/github.png";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const root = document.getElementById("root-container");
    if (root) {
      root.classList.remove("dark-mode", "light-mode");
      root.classList.add(darkMode ? "dark-mode" : "light-mode");
    }
  }, [darkMode]);

  return (
    <header className="py-3 border-bottom shadow-sm sticky-top header-theme">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Home navigation */}
        <Link
          to="/"
          className="d-flex align-items-center gap-2 text-decoration-none text-dark"
        >
          <img src={logo} alt="Logo" height="32" />
          <h5 className="m-0 fw-bold">StartMyDev</h5>
        </Link>

        <div className="d-flex align-items-center gap-3">
          <a
            href="https://github.com/otaku0304/StartMyDev"
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
            className="text-decoration-none"
          >
            <FaGithub size={24} className="github-icon" />
          </a>

          <a
            href="https://your-docs-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none fw-semibold"
          >
            Docs
          </a>
          <button
            className={`btn btn-sm ${darkMode ? "btn-light" : "btn-dark"}`}
            onClick={toggleTheme}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
