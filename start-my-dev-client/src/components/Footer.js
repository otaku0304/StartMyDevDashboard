import { useEffect, useState } from "react";

const Footer = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <footer
      className={`text-white position-relative overflow-hidden ${
        loaded ? "footer-slide-up" : "opacity-0"
      }`}
      style={{
        background: "#111",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        transition: "all 0.8s ease-in-out",
      }}
    >
      <div className="container-fluid px-4 py-4 d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start">
        <div className="mb-3 mb-md-0">
          <small className="text-light">
            &copy; {new Date().getFullYear()} <strong className="gradient-text">StartMyDev</strong>. Licensed under Apache 2.0.
          </small>
        </div>
        <div>
          <small className="text-light">
            Made with{" "}
            <span className="glow-heart" role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by{" "}
            <a
              href="https://www.google.com/search?q=mr_ask_chay"
              className="text-decoration-none gradient-text fw-bold hover-glow"
              target="_blank"
              rel="noopener noreferrer"
            >
              mr_ask_chay
            </a>
          </small>
        </div>
      </div>

      {/* Scoped CSS Animations and Styling */}
      <style>{`
        .footer-slide-up {
          opacity: 1;
          transform: translateY(0);
        }

        footer {
          transform: translateY(50px);
        }

        .gradient-text {
          background: linear-gradient(to right, #f7971e, #ffd200);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hover-glow:hover {
          text-shadow: 0 0 10px #ffd200;
          transition: all 0.3s ease-in-out;
        }

        .glow-heart {
          animation: pulse 1.5s infinite;
          color: #ff6b6b;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
