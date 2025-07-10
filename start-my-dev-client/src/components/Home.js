import { Link } from "react-router-dom";
import heroImg from "../assets/hero.svg";
import reportImg from "../assets/report.svg";
import relaxImg from "../assets/relax.svg";
import inProgressImg from "../assets/inprogress.svg";
import adventureImg from "../assets/adventure.svg";

const Home = () => {
  return (
    <div className="container-fluid py-5">
      {/* Hero Section */}
      <section className="row align-items-center mb-5">
        <div className="col-md-7 text-center text-md-start">
          <h1 className="display-custom fw-bold">
            Supercharge Your Development
          </h1>
          <p className="lead fw-normal mt-3">
            Instantly generate setup scripts tailored to your tech stack and
            environment. Speed up onboarding, boost consistency, and reduce
            errors.
          </p>
          <Link to="/script-generator" className="btn btn-primary btn-lg mt-4">
            Get Started
          </Link>
        </div>
        <div className="col-md-5 text-center">
          <img
            src={heroImg}
            alt="Developer productivity illustration"
            className="img-fluid"
            style={{ maxHeight: "320px" }}
          />
        </div>
      </section>

      {/* What is StartMyDev */}
      <section className="row align-items-center mb-5">
        <div className="col-md-5 text-center">
          <img
            src={reportImg}
            alt="Developer productivity illustration"
            className="img-fluid"
            style={{ maxHeight: "320px" }}
          />
        </div>
        <div className="col-md-7 text-center text-md-start">
          <h1 className="display-custom fw-bold">What is StartMyDev?</h1>
          <p className="lead fw-normal mt-3">
            <strong>StartMyDev</strong> is a lightweight utility that simplifies
            project environment setup. Whether you work with frontend, backend,
            or fullstack projects, it helps generate ready-to-use PowerShell
            scripts based on your preferences.
          </p>
        </div>
      </section>

      {/* The Challenge */}
      <section className="row align-items-center mb-5">
        <div className="col-md-7 text-center text-md-start">
          <h3 className="display-custom fw-bold">
            Why Manual Setup Slows You Down
          </h3>
          <ul className="lead fw-normal mt-2">
            <li>
              Setting up frontend and backend manually in multiple terminals
              wastes time
            </li>
            <li>Remembering port numbers, flags, and paths is error-prone</li>
            <li>
              Onboarding new developers becomes inefficient without automation
            </li>
            <li>Even advanced IDEs require repetitive manual configurations</li>
          </ul>
        </div>
        <div className="col-md-5 text-center">
          <img
            src={adventureImg}
            alt="Developer productivity illustration"
            className="img-fluid"
            style={{ maxHeight: "320px" }}
          />
        </div>
      </section>

      {/* The Solution */}
      <section className="row align-items-center mb-5">
        <div className="col-md-5 text-center">
          <img
            src={inProgressImg}
            alt="Developer productivity illustration"
            className="img-fluid"
            style={{ maxHeight: "320px" }}
          />
        </div>
        <div className="col-md-7 text-center text-md-start">
          <h1 className="display-custom fw-bold">How StartMyDev Helps</h1>
          <p className="fw-normal">StartMyDev makes setup seamless:</p>
          <div className="lead mt-3">
            <ul className="fw-normal">
              <li>Generates platform-specific PowerShell scripts in seconds</li>
              <li>Supports React, Angular, Spring Boot, Flask, and Node.js</li>
              <li>Customize ports, paths, profiles, and PowerShell versions</li>
              <li>Download two ready-to-run script files.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="row align-items-center mb-5">
        <div className="col-md-7 text-center text-md-start">
          <h1 className="display-custom fw-bold">Key Features</h1>
          <div className="lead fw-normal mt-3">
            <ul className="fw-normal">
              <li>Generate scripts for frontend, backend, or fullstack</li>
              <li>Works with dev, staging, and production environments</li>
              <li>Supports Windows (Linux & macOS coming soon)</li>
              <li>Configure ports, Java paths, and Spring profiles</li>
              <li>
                Privacy Focused We don’t collect any user or project data.
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-5 text-center">
          <img
            src={relaxImg}
            alt="Developer productivity illustration"
            className="img-fluid"
            style={{ maxHeight: "320px" }}
          />
        </div>
      </section>

      {/* Call To Action */}
      <section className="text-center mt-5">
        <h3 className="fw-bold">Start Building Smarter, Not Harder</h3>
        <p className="lead fw-normal">
          Let StartMyDev handle your setup, so you can focus on building great
          software.
        </p>
        <Link to="/script-generator" className="btn btn-primary btn-lg">
          Generate My Script Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
