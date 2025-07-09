import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-4">Welcome to StartMyDev 🚀</h1>
        <p className="lead text-muted mt-3">
          Kickstart your development projects with ease and confidence.
        </p>
        <Link to="/script-generator" className="btn btn-primary btn-lg mt-4">
          Get Started
        </Link>
      </div>

      {/* What is StartMyDev */}
      <section className="mb-5">
        <h2 className="fw-semibold">🌟 What is StartMyDev?</h2>
        <p className="text-muted mt-2">
          <strong>StartMyDev</strong> is a smart and lightweight utility
          designed to automate the initial setup of your development projects.
          Whether you're building a frontend, backend, or fullstack application,
          StartMyDev provides a unified interface to generate PowerShell scripts
          tailored to your stack and environment.
        </p>
        <p className="text-muted">
          It eliminates the hassle of remembering terminal commands, setting up
          ports, and organizing boilerplate code for different tech stacks.
        </p>
      </section>

      {/* The Problem */}
      <section className="mb-5">
        <h2 className="fw-semibold">
          😓 The Problem with Current IDEs & Setups
        </h2>
        <ul className="text-muted mt-2">
          <li>
            Manual setup across multiple terminals (frontend, backend, etc.)
            slows down productivity.
          </li>
          <li>
            Developers often forget required flags, ports, or build commands
            when switching projects.
          </li>
          <li>
            Onboarding new developers becomes tedious due to inconsistent local
            setup instructions.
          </li>
          <li>
            Current IDEs are powerful but still require manual configuration for
            each stack.
          </li>
        </ul>
      </section>

      {/* The Solution */}
      <section className="mb-5">
        <h2 className="fw-semibold">💡 How StartMyDev Solves It</h2>
        <p className="text-muted">
          StartMyDev acts as a command generator tailored to your stack, OS, and
          project structure. In seconds, it:
        </p>
        <ul className="text-muted">
          <li>Generates and downloads ready-to-run PowerShell scripts</li>
          <li>Supports Windows OS for now (Linux/Mac coming soon!)</li>
          <li>
            Provides setup for React, Angular, Spring Boot, Node.js, Flask and
            fullstack combos
          </li>
          <li>
            Lets you customize paths, ports, Java path, and Spring profiles
          </li>
        </ul>
      </section>

      {/* Key Features */}
      <section className="mb-5">
        <h2 className="fw-semibold">🛠 Key Features</h2>
        <div className="row text-muted">
          <div className="col-md-6 mb-3">
            ✅ Choose between Frontend, Backend, or Fullstack
          </div>
          <div className="col-md-6 mb-3">
            ✅ Supports React, Angular, Spring Boot, Flask, Node.js
          </div>
          <div className="col-md-6 mb-3">
            ✅ Customize PowerShell version, ports, and environments
          </div>
          <div className="col-md-6 mb-3">
            ✅ One-click script generation and ZIP download
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="text-center mt-5">
        <h3 className="fw-bold">🚀 Ready to launch your project?</h3>
        <p className="text-muted">
          Let StartMyDev create your dev setup in seconds.
        </p>
        <Link to="/script-generator" className="btn btn-success btn-lg">
          Generate My Script Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
