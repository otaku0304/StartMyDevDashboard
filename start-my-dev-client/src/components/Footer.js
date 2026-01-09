import { useEffect, useState } from "react";
import { FaHeart, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <footer
      className={`footer-theme position-relative overflow-hidden ${loaded ? "footer-slide-up" : "opacity-0"
        }`}
    >
      {/* Animated Background Elements */}
      <div className="footer-bg-shapes">
        <div className="footer-shape footer-shape-1"></div>
        <div className="footer-shape footer-shape-2"></div>
        <div className="footer-shape footer-shape-3"></div>
      </div>

      <div className="container-fluid px-4 py-5 position-relative">
        {/* Main Footer Content */}
        <div className="row g-4 mb-4">
          {/* Brand Section */}
          <div className="col-md-4 text-center text-md-start">
            <h5 className="fw-bold mb-3">
              <span className="brand-gradient">StartMyDev</span>
            </h5>
            <p className="footer-description">
              Automate your development workflow with intelligent script generation.
              Save time, boost productivity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 text-center">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <div className="d-flex flex-column gap-2">
              <a href="/" className="footer-link">Home</a>
              <a href="/script-generator" className="footer-link">Script Generator</a>
              <a href="/docs" className="footer-link">Documentation</a>
              <a href="https://github.com/otaku0304/StartMyDevDashboard" target="_blank" rel="noopener noreferrer" className="footer-link">
                GitHub Repository
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="col-md-4 text-center text-md-end">
            <h6 className="fw-bold mb-3">Connect</h6>
            <div className="social-links">
              <a
                href="https://github.com/otaku0304/StartMyDevDashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start pt-4">
          <div className="mb-3 mb-md-0">
            <small className="footer-text">
              © {new Date().getFullYear()} <strong className="brand-gradient">StartMyDev</strong>. Licensed under Apache 2.0.
            </small>
          </div>
          <div>
            <small className="footer-text">
              Made with{" "}
              <FaHeart className="heart-icon" />{" "}
              by{" "}
              <a
                href="https://www.google.com/search?q=mr_ask_chay"
                className="creator-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                mr_ask_chay
              </a>
            </small>
          </div>
        </div>
      </div>

      {/* Scoped Styles */}
      <style>{`
        /* Footer Base */
        footer {
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          margin-top: auto;
        }

        .footer-slide-up {
          opacity: 1;
          transform: translateY(0);
        }

        /* Background Shapes */
        .footer-bg-shapes {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .footer-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }

        .footer-shape-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          top: -150px;
          left: -100px;
          animation: floatShape 15s ease-in-out infinite;
        }

        .footer-shape-2 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #f093fb, #f5576c);
          bottom: -100px;
          right: 10%;
          animation: floatShape 12s ease-in-out infinite reverse;
        }

        .footer-shape-3 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          top: 50%;
          right: -75px;
          animation: floatShape 18s ease-in-out infinite;
        }

        @keyframes floatShape {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        /* Brand Gradient */
        .brand-gradient {
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
        }

        /* Footer Description */
        .footer-description {
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.6;
          max-width: 300px;
        }

        /* Footer Links */
        .footer-link {
          color: inherit;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
          position: relative;
        }

        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer-link:hover {
          color: #667eea;
          transform: translateX(5px);
        }

        .footer-link:hover::after {
          width: 100%;
        }

        /* Social Links */
        .social-links {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
        }

        @media (min-width: 768px) {
          .social-links {
            justify-content: flex-end;
          }
        }

        .social-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          color: inherit;
          font-size: 1.25rem;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          text-decoration: none;
        }

        .social-icon:hover {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          transform: translateY(-5px) rotate(5deg);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }

        .dark-mode .social-icon {
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.3);
        }

        /* Footer Divider */
        .footer-divider {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(99, 102, 241, 0.3) 50%,
            transparent
          );
          margin: 1rem 0;
        }

        /* Footer Text */
        .footer-text {
          opacity: 0.8;
          font-size: 0.875rem;
        }

        /* Heart Icon */
        .heart-icon {
          color: #ff6b6b;
          animation: heartbeat 1.5s ease-in-out infinite;
          display: inline-block;
          margin: 0 0.25rem;
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.1);
          }
        }

        /* Creator Link */
        .creator-link {
          color: inherit;
          text-decoration: none;
          font-weight: 700;
          background: linear-gradient(135deg, #f7971e, #ffd200);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: all 0.3s ease;
          position: relative;
        }

        .creator-link:hover {
          filter: drop-shadow(0 0 10px rgba(255, 210, 0, 0.6));
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .footer-description {
            max-width: 100%;
          }

          .social-links {
            margin-top: 1rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
