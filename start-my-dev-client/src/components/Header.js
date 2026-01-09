import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaGithub, FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const root = document.getElementById("root-container");
    if (root) {
      root.classList.remove("dark-mode", "light-mode");
      root.classList.add(darkMode ? "dark-mode" : "light-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`py-3 border-bottom sticky-top header-theme fade-in ${scrolled ? "header-scrolled" : ""
        }`}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo & Brand */}
        <Link
          to="/"
          className="d-flex align-items-center gap-2 text-decoration-none logo-container"
        >
          <div className="logo-wrapper">
            <img src={logo} alt="StartMyDev Logo" height="36" className="logo-img" />
          </div>
          <h5 className="m-0 fw-bold brand-name">StartMyDev</h5>
        </Link>

        {/* Navigation & Actions */}
        <div className="d-flex align-items-center gap-3">
          {/* GitHub Link */}
          <a
            href="https://github.com/otaku0304/StartMyDevDashboard"
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
            className="nav-icon-link"
          >
            <FaGithub size={20} className="nav-icon" />
          </a>

          {/* Docs Link */}
          <Link to="/docs" className="nav-link-custom">
            Docs
          </Link>

          {/* Theme Toggle */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <div className="theme-toggle-inner">
              {darkMode ? (
                <FaSun className="theme-icon" />
              ) : (
                <FaMoon className="theme-icon" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Scoped Styles */}
      <style>{`
        /* Header Transitions */
        .header-theme {
          transition: all 0.25s ease;
        }

        .header-scrolled {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .dark-mode .header-scrolled {
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
        }

        /* Logo - Subtle Animation */
        .logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-img {
          transition: transform 0.3s ease;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .logo-container:hover .logo-img {
          transform: scale(1.05);
        }

        .brand-name {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 1.25rem;
          letter-spacing: -0.01em;
          font-family: 'Space Grotesk', 'Poppins', sans-serif;
        }

        /* Navigation Icons */
        .nav-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .nav-icon {
          transition: transform 0.25s ease;
        }

        .nav-icon-link:hover {
          background: rgba(79, 70, 229, 0.1);
        }

        .nav-icon-link:hover .nav-icon {
          transform: scale(1.1);
        }

        .dark-mode .nav-icon-link:hover {
          background: rgba(99, 102, 241, 0.15);
        }

        /* Navigation Link */
        .nav-link-custom {
          position: relative;
          padding: 0.5rem 1rem;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.25s ease;
        }

        .nav-link-custom::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          transform: translateX(-50%);
          transition: width 0.25s ease;
        }

        .nav-link-custom:hover {
          background: rgba(79, 70, 229, 0.1);
        }

        .nav-link-custom:hover::after {
          width: 70%;
        }

        .dark-mode .nav-link-custom:hover {
          background: rgba(99, 102, 241, 0.15);
        }

        /* Theme Toggle Button - Refined */
        .theme-toggle-btn {
          width: 44px;
          height: 44px;
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle-inner {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
          transition: all 0.25s ease;
        }

        .theme-toggle-btn:hover .theme-toggle-inner {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
        }

        .theme-toggle-btn:active .theme-toggle-inner {
          transform: scale(0.95);
        }

        .theme-icon {
          color: white;
          font-size: 1.1rem;
          transition: transform 0.3s ease;
        }

        /* Fade In Animation */
        .fade-in {
          animation: fadeInHeader 0.5s ease-in-out;
        }

        @keyframes fadeInHeader {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .brand-name {
            font-size: 1.1rem;
          }

          .nav-link-custom {
            padding: 0.4rem 0.8rem;
            font-size: 0.9rem;
          }

          .theme-toggle-inner {
            width: 36px;
            height: 36px;
          }

          .theme-icon {
            font-size: 1rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
