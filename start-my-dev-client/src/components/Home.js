import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import heroImg from "../assets/hero.svg";
import reportImg from "../assets/report.svg";
import relaxImg from "../assets/relax.svg";

const Home = () => {
  return (
    <div className="container-fluid py-5">
      <Helmet>
        <title>StartMyDev | Automate Your Project Setup</title>
        <meta name="description" content="Instantly generate PowerShell and Bash setup scripts for React, Angular, Spring Boot, and Flask projects. Automate your development environment with StartMyDev." />
        <meta name="keywords" content="developer tools, project generator, script generator, powershell scripts, bash scripts, react setup, spring boot setup, automation" />
      </Helmet>

      {/* Hero Section */}
      <section className="row align-items-center mb-5">
        <div className="col-md-7 text-center text-md-start">
          <h1 className="display-custom fw-bold">
            Automate Your Project Setup with StartMyDev
          </h1>
          <p className="lead fw-normal mt-3">
            The ultimate <strong>Developer Dashboard</strong> to instantly generate
            <strong> PowerShell (Windows)</strong> and <strong>Bash (Linux)</strong> scripts.
            Launch fullstack <strong>React, Angular, Spring Boot, and Flask</strong> applications
            in seconds—no manual configuration or IDE required.
          </p>
          <Link to="/script-generator" className="btn btn-primary btn-lg mt-4 shadow-sm">
            Generate Setup Script
          </Link>
        </div>
        <div className="col-md-5 text-center">
          <img
            src={heroImg}
            alt="Automate developer environment setup"
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
            alt="Cross-platform script generator"
            className="img-fluid"
            style={{ maxHeight: "320px" }}
          />
        </div>
        <div className="col-md-7 text-center text-md-start">
          <h2 className="fw-bold">Why Choose StartMyDev?</h2>
          <p className="lead fw-normal mt-3">
            <strong>StartMyDev</strong> is the #1 open-source tool for scaffolding and launching development environments.
            Whether you are using <strong>Windows</strong> or <strong>Linux</strong>, our intelligent script generator handles
            dependencies, ports, and git branches automatically.
          </p>
          <p className="text-muted">
            Perfect for DevOps engineers, Fullstack developers, and teams looking to standardize their project startup workflows.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="row justify-content-center mb-5">
        <div className="col-md-7">
          <h2 className="text-center fw-bold mb-4">How to Generate Your Script</h2>
          <ol className="ps-3 lead fs-6">
            <li className="mb-3">
              Select your <strong>Operating System</strong> (Windows PowerShell or Linux Bash).
            </li>
            <li className="mb-3">
              Choose your <strong>Tech Stack</strong>: Frontend (React, Angular), Backend (Spring Boot, Flask), or Fullstack.
            </li>
            <li className="mb-3">
              Configure <strong>Local Environment</strong> details: Ports, Profiles, and Git Branches.
            </li>
            <li className="mb-3">
              <strong>Download & Run:</strong> Execute the generated `.ps1` or `.sh` file to instantly boot your app.
            </li>
          </ol>
        </div>
      </section>

      {/* Key Features */}
      <section className="row align-items-center mb-5">
        <div className="col-md-7 text-center text-md-start">
          <h2 className="fw-bold">Features & Capabilities</h2>
          <ul className="lead fw-normal mt-3 list-unstyled">
            <li className="mb-2">✅ <strong>Cross-Platform:</strong> Native support for Windows (PowerShell 5/7) and Linux (Bash).</li>
            <li className="mb-2">✅ <strong>Multi-Stack:</strong> React, Angular, Spring Boot, Flask, and Node.js ready.</li>
            <li className="mb-2">✅ <strong>Zero-Config:</strong> No IDEs required—run directly from your terminal.</li>
            <li className="mb-2">✅ <strong>Customizable:</strong> Set Java paths, Python paths, and active profiles easily.</li>
            <li className="mb-2">✅ <strong>Privacy-First:</strong> 100% Client-side generation. No data stored.</li>
          </ul>
        </div>
        <div className="col-md-5 text-center">
          <img
            src={relaxImg}
            alt="Developer productivity tools"
            className="img-fluid"
            style={{ maxHeight: "320px" }}
          />
        </div>
      </section>

      {/* Call To Action */}
      <section className="text-center mt-5 mb-5">
        <div className="p-5 rounded-4 bg-light bg-gradient shadow-sm border">
          <h3 className="fw-bold">Ready to Simplify Your Workflow?</h3>
          <p className="lead fw-normal mb-4">
            Join developers who are saving hours on setup time.
          </p>
          <Link to="/script-generator" className="btn btn-primary btn-lg px-5 text-uppercase fw-bold shadow">
            Start Automating Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
