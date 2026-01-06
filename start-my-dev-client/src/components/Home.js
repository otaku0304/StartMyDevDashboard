import { Link } from "react-router-dom";
import heroImg from "../assets/hero.svg";
import reportImg from "../assets/report.svg";
import relaxImg from "../assets/relax.svg";

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
            Instantly generate PowerShell (Windows) or Bash (Linux) setup scripts tailored to your tech
            stack. No IDEs, no manual installs — just run and go.
          </p>
          <Link to="/script-generator" className="btn btn-primary btn-lg mt-4">
            Get Started
          </Link>
        </div>
        <div className="col-md-5 text-center">
          <img
            src={heroImg}
            alt="Developer productivity"
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
            alt="Script generator"
            className="img-fluid"
            style={{ maxHeight: "320px" }}
          />
        </div>
        <div className="col-md-7 text-center text-md-start">
          <h2 className="fw-bold">What is StartMyDev?</h2>
          <p className="lead fw-normal mt-3">
            <strong>StartMyDev</strong> is a lightweight automation tool that
            helps you run ready-to-use frontend, backend, or fullstack
            applications using generated automation scripts — without opening
            IDEs like VS Code or IntelliJ.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="row justify-content-center mb-5">
        <div className="col-md-7">
          <h2 className="text-center fw-bold mb-4">How It Works</h2>
          <ol className="ps-3">
            <li className="mb-3">
              Select your <strong>Operating System</strong> (compatible with windows and linux all over the project).
            </li>
            <li className="mb-3">
              Choose your <strong>Project Type</strong>: Frontend, Backend, or
              Fullstack.
            </li>
            <li className="mb-3">
              Provide necessary configuration options (ports, project folder,
              PowerShell version for Windows, etc.).
            </li>
            <li className="mb-3">
              Download the generated script and run it by:
              <ul className="mt-2">
                <li>Double-clicking the `.ps1` (Windows) or executing `.sh` script (Linux)</li>
                <li>Or running manually in your terminal</li>
              </ul>
            </li>
            <li className="mb-3">
              No IDEs or manual dependency setup required. Everything works via
              script execution.
            </li>
            <li className="mb-3">
              <strong>100% Privacy Focused:</strong> No data is collected. The
              platform is fully open-source.
            </li>
          </ol>
        </div>
      </section>

      {/* Key Features */}
      <section className="row align-items-center mb-5">
        <div className="col-md-7 text-center text-md-start">
          <h2 className="fw-bold">Key Features</h2>
          <ul className="lead fw-normal mt-3">
            <li>Supports PowerShell (Windows) and Bash (Linux)</li>
            <li>Supports React, Angular, Spring Boot, Flask (more coming)</li>
            <li>Project types: Frontend, Backend, or Fullstack</li>
            <li>Works in dev, staging, or production environments</li>
            <li>Configure Java paths, ports, and Spring profiles with ease</li>
            <li>Runs on Windows and Linux</li>
          </ul>
        </div>
        <div className="col-md-5 text-center">
          <img
            src={relaxImg}
            alt="Configuration features"
            className="img-fluid"
            style={{ maxHeight: "320px" }}
          />
        </div>
      </section>

      {/* Call To Action */}
      <section className="text-center mt-5">
        <h3 className="fw-bold">Start Building Smarter, Not Harder</h3>
        <p className="lead fw-normal">
          Let StartMyDev handle the setup. You focus on building great software.
        </p>
        <Link to="/script-generator" className="btn btn-primary btn-lg">
          Generate My Script Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
