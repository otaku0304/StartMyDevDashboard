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
      { threshold: 0.15 }
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
    <div className="container-fluid px-0">
      <Helmet>
        <title>StartMyDev | Automate Your Project Setup</title>
        <meta
          name="description"
          content="Instantly generate PowerShell and Bash setup scripts for React, Angular, Spring Boot, and Flask projects."
        />
        <meta
          name="keywords"
          content="developer tools, project generator, script generator, powershell, bash, automation"
        />
      </Helmet>

      {/* Hero Section */}
      <section
        ref={addToRefs}
        data-section="hero"
        className="position-relative py-5 overflow-hidden"
        style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}
      >
        <div className="container">
          <div className={`row align-items-center ${isVisible.hero ? "fade-in-up" : "scroll-reveal"}`}>
            <div className="col-lg-6 text-center text-lg-start z-1">
              <div className="d-inline-flex align-items-center px-3 py-1 mb-4 rounded-pill bg-primary-subtle border border-primary-subtle">
                <FaBolt className="text-primary me-2" size={12} />
                <small className="fw-semibold text-primary tracking-wide">DEV PRODUCTIVITY BOOSTER</small>
              </div>

              <h1 className="display-custom mb-4 tight-leading">
                Initialize Projects <br />
                <span className="text-gradient">In Seconds.</span>
              </h1>

              <p className="lead text-muted mb-5" style={{ maxWidth: "540px" }}>
                Stop wrestling with configuration. Generate production-ready setup scripts for
                <span className="fw-semibold text-body"> Windows</span> and <span className="fw-semibold text-body">Linux</span> instantly.
                Supports React, Spring Boot, Flask, and more.
              </p>

              <div className="d-flex gap-3 flex-column flex-sm-row justify-content-center justify-content-lg-start">
                <Link to="/script-generator" className="btn btn-primary btn-lg shadow-sm">
                  <FaRocket className="me-2" /> Start Generating
                </Link>
                <Link to="/docs" className="btn btn-outline-secondary btn-lg">
                  <FaCode className="me-2" /> Reads Docs
                </Link>
              </div>

              <div className="mt-5 pt-3 d-flex align-items-center gap-4 text-muted small">
                <div className="d-flex align-items-center">
                  <FaCheckCircle className="text-success me-2" /> 100% Client-Side
                </div>
                <div className="d-flex align-items-center">
                  <FaCheckCircle className="text-success me-2" /> No Data Stored
                </div>
                <div className="d-flex align-items-center">
                  <FaCheckCircle className="text-success me-2" /> Open Source
                </div>
              </div>
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0 text-center position-relative">
              {/* Abstract decorative background blob - visible in light/dark appropriately via CSS opacity */}
              <div className="blob-bg"></div>

              <img
                src={heroImg}
                alt="Developer Dashboard"
                className="img-fluid position-relative z-2 float"
                style={{ maxHeight: "450px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        ref={addToRefs}
        data-section="features"
        className="py-5"
      >
        <div className="container py-5">
          <div className="text-center mb-5 mw-700 mx-auto">
            <h2 className="fw-bold mb-3">Everything You Need</h2>
            <p className="text-muted lead">Streamlined for performance and simplicity.</p>
          </div>

          <div className={`row g-4 ${isVisible.features ? "fade-in-up" : "scroll-reveal"}`}>
            {[
              {
                icon: <FaLayerGroup />,
                title: "Cross-Platform",
                desc: "Native .ps1 for Windows and .sh for Linux.",
                color: "var(--color-primary)"
              },
              {
                icon: <FaCog />,
                title: "Zero Config",
                desc: "No installing global CLIs. Just run the script.",
                color: "var(--color-secondary)"
              },
              {
                icon: <FaShieldAlt />,
                title: "Privacy First",
                desc: "Logic runs in your browser. Totally offline-capable.",
                color: "var(--color-accent)"
              }
            ].map((feature, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card h-100 p-4 border-0 shadow-sm hover-lift">
                  <div
                    className="icon-square mb-4 d-inline-flex align-items-center justify-content-center rounded-3"
                    style={{ width: "50px", height: "50px", background: `${feature.color}20`, color: feature.color, fontSize: "1.5rem" }}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="fw-bold mb-3 h5">{feature.title}</h4>
                  <p className="text-muted mb-0">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        ref={addToRefs}
        data-section="how"
        className="py-5 bg-body-tertiary"
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-5 order-lg-2 mb-5 mb-lg-0 text-center">
              <img
                src={reportImg}
                alt="Process"
                className="img-fluid"
                style={{ maxHeight: "380px" }}
              />
            </div>
            <div className={`col-lg-7 order-lg-1 ${isVisible.how ? "slide-in-left" : "scroll-reveal"}`}>
              <h2 className="fw-bold mb-4">Workflow Simplified</h2>
              <div className="d-flex flex-column gap-4">
                {[
                  { step: "01", title: "Select OS", desc: "Choose your target environment (Windows/Linux)." },
                  { step: "02", title: "Pick Tech Stack", desc: "React, Angular, Spring Boot, Flask, or Node.js." },
                  { step: "03", title: "Configure", desc: "Set ports, git branches, and project names." },
                  { step: "04", title: "Launch", desc: "Download and run. Your environment is ready." }
                ].map((item, i) => (
                  <div className="d-flex" key={i}>
                    <div className="me-4">
                      <span className="display-6 fw-bold text-gradient-secondary opacity-50">{item.step}</span>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">{item.title}</h5>
                      <p className="text-muted mb-0">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Tech Stack Banner */}
      <section
        ref={addToRefs}
        data-section="tech"
        className="py-5"
      >
        <div className="container py-5 text-center">
          <p className="fw-semibold text-muted text-uppercase letter-spacing-2 mb-4">Supported Technologies</p>
          <div className="d-flex flex-wrap justify-content-center gap-3 gap-md-4 opacity-75">
            {["React", "Angular", "Spring Boot", "Flask", "Node.js", "PostgreSQL", "MongoDB"].map((tech) => (
              <span key={tech} className="tech-badge badge rounded-pill px-4 py-2 fw-normal fs-6">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section
        ref={addToRefs}
        data-section="cta"
        className="py-5 mb-5"
      >
        <div className="container">
          <div className="rounded-4 p-5 text-center position-relative overflow-hidden bg-primary text-white shadow-lg">
            {/* Subtle background pattern */}
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "radial-gradient(circle at top right, rgba(255,255,255,0.1), transparent)", pointerEvents: "none" }}></div>

            <div className="position-relative z-1 py-4">
              <h2 className="fw-bold mb-3 display-6">Ready to Automate?</h2>
              <p className="lead mb-4 opacity-90 mx-auto" style={{ maxWidth: "600px" }}>
                Join developers who are saving hours on setup time. No account required.
              </p>
              <Link to="/script-generator" className="btn btn-light btn-lg px-5 fw-bold text-primary hover-scale">
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scoped Styles for Blob and Polish */}
      <style>{`
        .bg-primary-subtle {
          background-color: rgba(79, 70, 229, 0.1) !important;
        }
        .text-primary {
          color: var(--color-primary) !important;
        }
        .border-primary-subtle {
          border-color: rgba(79, 70, 229, 0.2) !important;
        }
        
        .tight-leading {
          line-height: 1.1;
        }
        
        .letter-spacing-2 {
          letter-spacing: 0.15em;
        }

        .blob-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          z-index: 1;
          filter: blur(40px);
        }

        .dark-mode .blob-bg {
          background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%);
        }

        .mw-700 {
          max-width: 700px;
        }
        
        /* Smooth fade for the background color change in section */
        .bg-body-tertiary {
          transition: background-color 0.3s ease;
        }
        
        .dark-mode .bg-body-tertiary {
          background-color: rgba(255, 255, 255, 0.03) !important;
        }

        .tech-badge {
          background-color: var(--color-surface-light);
          color: var(--color-text-light);
          border: 1px solid var(--color-border-light);
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .dark-mode .tech-badge {
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--color-text-dark);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tech-badge:hover {
          transform: translateY(-2px);
          border-color: var(--color-primary);
          box-shadow: 0 4px 8px rgba(79, 70, 229, 0.15);
        }
      `}</style>
    </div>
  );
};

export default Home;
