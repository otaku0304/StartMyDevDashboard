import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import heroImg from "../assets/hero.svg";
import reportImg from "../assets/report.svg";
import relaxImg from "../assets/relax.svg";
import {
  FaRocket,
  FaCode,
  FaCog,
  FaDownload,
  FaCheckCircle,
  FaBolt,
  FaShieldAlt,
  FaLayerGroup
} from "react-icons/fa";

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="container-fluid py-5 position-relative">
      <Helmet>
        <title>StartMyDev | Automate Your Project Setup</title>
        <meta
          name="description"
          content="Instantly generate PowerShell and Bash setup scripts for React, Angular, Spring Boot, and Flask projects. Automate your development environment with StartMyDev."
        />
        <meta
          name="keywords"
          content="developer tools, project generator, script generator, powershell scripts, bash scripts, react setup, spring boot setup, automation"
        />
      </Helmet>

      {/* Hero Section - Stunning Entry */}
      <section
        ref={addToRefs}
        data-section="hero"
        className={`row align-items-center mb-5 py-5 ${isVisible.hero ? "fade-in-up" : "scroll-reveal"
          }`}
      >
        <div className="col-md-7 text-center text-md-start">
          <div className="hero-badge mb-3">
            <FaBolt className="me-2" />
            <span>Automate Everything</span>
          </div>

          <h1 className="display-custom fw-bold mb-4">
            <span className="text-gradient">Automate Your</span>
            <br />
            Project Setup with
            <br />
            <span className="text-gradient-secondary">StartMyDev</span>
          </h1>

          <p className="lead fw-normal mt-4 mb-4 hero-description">
            The ultimate <strong className="highlight-text">Developer Dashboard</strong> to instantly generate
            <strong className="highlight-text"> PowerShell (Windows)</strong> and <strong className="highlight-text">Bash (Linux)</strong> scripts.
            Launch fullstack <strong className="highlight-text">React, Angular, Spring Boot, and Flask</strong> applications
            in seconds—no manual configuration or IDE required.
          </p>

          <div className="d-flex gap-3 flex-wrap mt-4">
            <Link to="/script-generator" className="btn btn-primary btn-lg cta-button">
              <FaRocket className="me-2" />
              Generate Setup Script
            </Link>
            <Link to="/docs" className="btn btn-secondary btn-lg cta-button-secondary">
              <FaCode className="me-2" />
              View Documentation
            </Link>
          </div>

          {/* Stats */}
          <div className="stats-container mt-5">
            <div className="stat-item">
              <div className="stat-number text-gradient">100%</div>
              <div className="stat-label">Client-Side</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-gradient-secondary">4+</div>
              <div className="stat-label">Tech Stacks</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-gradient-accent">2</div>
              <div className="stat-label">Platforms</div>
            </div>
          </div>
        </div>

        <div className="col-md-5 text-center mt-5 mt-md-0">
          <div className="hero-image-container">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
            <img
              src={heroImg}
              alt="Automate developer environment setup"
              className="img-fluid hero-image float"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        ref={addToRefs}
        data-section="features"
        className={`mb-5 py-5 ${isVisible.features ? "fade-in-up" : "scroll-reveal"
          }`}
      >
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 mb-3">
            <span className="text-gradient">Powerful Features</span>
          </h2>
          <p className="lead text-muted">Everything you need to streamline your development workflow</p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card glass-card p-4 h-100">
              <div className="feature-icon-wrapper mb-3">
                <FaLayerGroup className="feature-icon" />
              </div>
              <h4 className="fw-bold mb-3">Cross-Platform</h4>
              <p className="text-muted">
                Native support for Windows (PowerShell 5/7) and Linux (Bash). One tool, multiple platforms.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card glass-card p-4 h-100">
              <div className="feature-icon-wrapper mb-3">
                <FaCog className="feature-icon" />
              </div>
              <h4 className="fw-bold mb-3">Zero Configuration</h4>
              <p className="text-muted">
                No IDEs required—run directly from your terminal. Simple, fast, and efficient.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card glass-card p-4 h-100">
              <div className="feature-icon-wrapper mb-3">
                <FaShieldAlt className="feature-icon" />
              </div>
              <h4 className="fw-bold mb-3">Privacy First</h4>
              <p className="text-muted">
                100% client-side generation. Your data never leaves your browser. Completely secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section
        ref={addToRefs}
        data-section="why"
        className={`row align-items-center mb-5 py-5 ${isVisible.why ? "slide-in-left" : "scroll-reveal"
          }`}
      >
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <div className="image-wrapper">
            <img
              src={reportImg}
              alt="Cross-platform script generator"
              className="img-fluid hover-lift"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>

        <div className="col-md-7 text-center text-md-start">
          <h2 className="fw-bold display-5 mb-4">
            Why Choose <span className="text-gradient">StartMyDev</span>?
          </h2>
          <p className="lead fw-normal mb-4">
            <strong>StartMyDev</strong> is the #1 open-source tool for scaffolding and launching development environments.
            Whether you are using <strong>Windows</strong> or <strong>Linux</strong>, our intelligent script generator handles
            dependencies, ports, and git branches automatically.
          </p>

          <ul className="feature-list">
            <li className="feature-list-item">
              <FaCheckCircle className="check-icon" />
              <span>Intelligent dependency management</span>
            </li>
            <li className="feature-list-item">
              <FaCheckCircle className="check-icon" />
              <span>Automatic port configuration</span>
            </li>
            <li className="feature-list-item">
              <FaCheckCircle className="check-icon" />
              <span>Git branch handling</span>
            </li>
            <li className="feature-list-item">
              <FaCheckCircle className="check-icon" />
              <span>Multi-stack support</span>
            </li>
          </ul>
        </div>
      </section>

      {/* How It Works */}
      <section
        ref={addToRefs}
        data-section="how"
        className={`mb-5 py-5 ${isVisible.how ? "fade-in-up" : "scroll-reveal"
          }`}
      >
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 mb-3">
            <span className="text-gradient-accent">How It Works</span>
          </h2>
          <p className="lead text-muted">Get started in 4 simple steps</p>
        </div>

        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="step-card glass-card p-4 text-center h-100">
              <div className="step-number">01</div>
              <h5 className="fw-bold mt-3 mb-2">Select OS</h5>
              <p className="text-muted small">
                Choose Windows PowerShell or Linux Bash
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="step-card glass-card p-4 text-center h-100">
              <div className="step-number">02</div>
              <h5 className="fw-bold mt-3 mb-2">Pick Stack</h5>
              <p className="text-muted small">
                Select your tech stack and framework
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="step-card glass-card p-4 text-center h-100">
              <div className="step-number">03</div>
              <h5 className="fw-bold mt-3 mb-2">Configure</h5>
              <p className="text-muted small">
                Set ports, profiles, and git branches
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="step-card glass-card p-4 text-center h-100">
              <div className="step-number">04</div>
              <h5 className="fw-bold mt-3 mb-2">Download & Run</h5>
              <p className="text-muted small">
                Execute the script and launch your app
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section
        ref={addToRefs}
        data-section="tech"
        className={`row align-items-center mb-5 py-5 ${isVisible.tech ? "slide-in-right" : "scroll-reveal"
          }`}
      >
        <div className="col-md-7 text-center text-md-start mb-4 mb-md-0">
          <h2 className="fw-bold display-5 mb-4">
            <span className="text-gradient-secondary">Supported Technologies</span>
          </h2>

          <div className="tech-grid">
            <div className="tech-badge">React</div>
            <div className="tech-badge">Angular</div>
            <div className="tech-badge">Spring Boot</div>
            <div className="tech-badge">Flask</div>
            <div className="tech-badge">Node.js</div>
            <div className="tech-badge">Python</div>
            <div className="tech-badge">Java</div>
            <div className="tech-badge">TypeScript</div>
          </div>

          <p className="lead mt-4 text-muted">
            Perfect for DevOps engineers, Fullstack developers, and teams looking to standardize their project startup workflows.
          </p>
        </div>

        <div className="col-md-5 text-center">
          <div className="image-wrapper">
            <img
              src={relaxImg}
              alt="Developer productivity tools"
              className="img-fluid hover-lift"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={addToRefs}
        data-section="cta"
        className={`text-center mt-5 mb-5 py-5 ${isVisible.cta ? "scale-in" : "scroll-reveal"
          }`}
      >
        <div className="cta-container glass-card p-5">
          <div className="cta-glow"></div>
          <h3 className="fw-bold display-5 mb-3">
            Ready to <span className="text-gradient">Simplify</span> Your Workflow?
          </h3>
          <p className="lead fw-normal mb-4 text-muted">
            Join developers who are saving hours on setup time.
          </p>
          <Link
            to="/script-generator"
            className="btn btn-primary btn-lg px-5 cta-button pulse-glow"
          >
            <FaRocket className="me-2" />
            Start Automating Now
          </Link>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        /* Hero Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1.25rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--color-primary);
          animation: slideInDown 0.6s ease-out;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dark-mode .hero-badge {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
          border-color: rgba(99, 102, 241, 0.4);
          color: var(--color-primary-light);
        }

        /* Hero Description */
        .hero-description {
          font-size: 1.125rem;
          line-height: 1.8;
          max-width: 600px;
        }

        .highlight-text {
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* CTA Buttons */
        .cta-button,
        .cta-button-secondary {
          position: relative;
          font-weight: 600;
          letter-spacing: 0.02em;
          border: none;
          overflow: hidden;
          z-index: 1;
        }

        .cta-button {
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }

        .cta-button-secondary {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        /* Stats Container */
        .stats-container {
          display: flex;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: left;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.7;
        }

        /* Hero Image Container */
        .hero-image-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-image {
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
        }

        /* Floating Shapes */
        .floating-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.6;
          z-index: 1;
        }

        .shape-1 {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          top: 10%;
          left: 10%;
          animation: float 6s ease-in-out infinite;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #f093fb, #f5576c);
          bottom: 20%;
          right: 10%;
          animation: float 8s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          top: 50%;
          right: 30%;
          animation: float 7s ease-in-out infinite;
        }

        /* Feature Cards */
        .feature-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .feature-icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-icon {
          color: white;
          font-size: 1.5rem;
        }

        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
        }

        /* Feature List */
        .feature-list {
          list-style: none;
          padding: 0;
        }

        .feature-list-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 0;
          font-size: 1.1rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .feature-list-item:hover {
          transform: translateX(10px);
        }

        .check-icon {
          color: var(--color-success);
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        /* Step Cards */
        .step-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .step-number {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .step-card:hover {
          transform: translateY(-10px) scale(1.05);
        }

        /* Tech Grid */
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }

        .tech-badge {
          padding: 1rem 1.5rem;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 12px;
          font-weight: 600;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .tech-badge:hover {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }

        .dark-mode .tech-badge {
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.4);
        }

        /* CTA Container */
        .cta-container {
          position: relative;
          overflow: hidden;
        }

        .cta-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent);
          transform: translate(-50%, -50%);
          animation: pulse 3s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.8;
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .stats-container {
            gap: 2rem;
          }

          .stat-number {
            font-size: 2rem;
          }

          .tech-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .floating-shape {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
