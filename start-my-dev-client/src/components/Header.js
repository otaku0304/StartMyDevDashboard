import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const root = document.getElementById("root-container");
    if (root) {
      root.classList.remove("dark-mode", "light-mode");
      root.classList.add(darkMode ? "dark-mode" : "light-mode");
    }
  }, [darkMode]);

  return (
    <header className="py-3 border-bottom sticky-top header-theme fade-in">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Home navigation */}
        <Link
          to="/"
          className="d-flex align-items-center gap-2 text-decoration-none text-dark"
        >
          <img src={logo} alt="Logo" height="32" />
          <h5 className="m-0 fw-bold">StartMyDev</h5>
        </Link>

        <div className="d-flex align-items-center gap-3">
          {/* GitHub Link */}
          <a
            href="https://github.com/otaku0304/StartMyDev"
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
            className="text-dark text-decoration-none hover-glow"
          >
            <FaGithub size={22} />
          </a>

          {/* Docs Link */}
          <Link
            to="/docs"
            className="fw-semibold text-dark text-decoration-none hover-glow"
          >
            Docs
          </Link>

          {/* Theme Toggle */}
          <button
            className={`btn btn-sm rounded-pill px-3 ${
              darkMode ? "btn-light" : "btn-dark"
            }`}
            onClick={toggleTheme}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hover-glow:hover {
          text-shadow: 0 0 8px rgba(0,0,0,0.25);
          transition: text-shadow 0.3s ease;
        }
      `}</style>
    </header>
  );
};

export default Header;
