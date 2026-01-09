import { Link } from "react-router-dom";
import { FaHeart, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-theme py-5 mt-auto border-top fade-in">
      <div className="container">
        <div className="row g-4 align-items-center justify-content-between">

          {/* Brand & Copyright */}
          <div className="col-md-4 text-center text-md-start">
            <h5 className="fw-bold mb-1 brand-gradient">StartMyDev</h5>
            <p className="text-muted small mb-0">
              © {new Date().getFullYear()} Licensed under Apache 2.0.
            </p>
          </div>

          {/* Links */}
          <div className="col-md-4 text-center">
            <div className="d-flex justify-content-center gap-3">
              <Link to="/script-generator" className="footer-link small">Generator</Link>
              <Link to="/docs" className="footer-link small">Documentation</Link>
              <a href="https://github.com/otaku0304/StartMyDevDashboard" target="_blank" rel="noopener noreferrer" className="footer-link small">GitHub</a>
            </div>
          </div>

          {/* Social & Creator */}
          <div className="col-md-4 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end align-items-center gap-3 mb-2">
              <a href="#" className="social-icon-link"><FaGithub /></a>
              <a href="#" className="social-icon-link"><FaTwitter /></a>
              <a href="#" className="social-icon-link"><FaLinkedin /></a>
            </div>
            <div className="small text-muted">
              Made with <FaHeart className="text-danger mx-1" size={12} /> by
              <a
                href="https://www.google.com/search?q=mr_ask_chay"
                className="fw-semibold text-decoration-none ms-1 text-primary-hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                mr_ask_chay
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-theme {
          background-color: var(--color-bg-light);
          transition: background-color 0.3s ease;
        }

        .dark-mode .footer-theme {
          background-color: var(--color-bg-dark);
        }

        .brand-gradient {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dark-mode .brand-gradient {
          background: linear-gradient(135deg, #818cf8 0%, #c4b5fd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-link {
          color: var(--color-text-muted-light);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .dark-mode .footer-link {
          color: var(--color-text-muted-dark);
        }

        .footer-link:hover {
          color: var(--color-primary);
        }

        .social-icon-link {
          color: var(--color-text-muted-light);
          font-size: 1.1rem;
          transition: all 0.2s ease;
        }

        .dark-mode .social-icon-link {
          color: var(--color-text-muted-dark);
        }

        .social-icon-link:hover {
          color: var(--color-primary);
          transform: translateY(-2px);
        }

        .text-primary-hover {
          color: inherit;
          transition: color 0.2s ease;
        }
        
        .text-primary-hover:hover {
          color: var(--color-primary) !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
