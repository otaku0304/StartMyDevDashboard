const GettingStarted = () => {
  return (
    <div>
      <h2 className="fw-bold">Getting Started</h2>
      <p>
        StartMyDev helps you generate PowerShell scripts to launch frontend,
        backend, or fullstack projects quickly.
      </p>

      <ol>
        <li>Select your operating system (currently only Windows supported)</li>
        <li>Choose the type of application: frontend, backend, or fullstack</li>
        <li>Select your project framework</li>
      </ol>

      <pre className="bg-light p-3 rounded">
        {`// Example setup:
OS: Windows
Application Type: Frontend
Project: React`}
      </pre>
    </div>
  );
};

export default GettingStarted;
