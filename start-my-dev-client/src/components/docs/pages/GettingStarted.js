const GettingStarted = () => {
  return (
    <div>
      <h2 className="fw-bold">Getting Started</h2>
      <p>
        A simple overview of what StartMyDev does and how users can benefit from
        it.
      </p>

      <ol>
        <li>StartMyDev helps you run ready-to-use projects with PowerShell.</li>

        <li>
          Choose the type of OS:
          <strong>Windows</strong>,
          <span className="text-muted">Linux (Coming Soon)</span>,
          <span className="text-muted">MacOS (Coming Soon)</span>
        </li>

        <li>
          Choose the type of Project:
          <ul className="mt-2">
            <li>
              <strong>Frontend</strong>
              <ul>
                <li>React</li>
                <li>Angular</li>
              </ul>
            </li>
            <li>
              <strong>Backend</strong>
              <ul>
                <li>Spring Boot (Maven)</li>
                <li>Flask</li>
              </ul>
            </li>
            <li>
              <strong>Fullstack</strong>
              <ul>
                <li>Angular + Spring Boot</li>
                <li>React + Spring Boot</li>
              </ul>
            </li>
          </ul>
          <p className="mt-2">
            Based on the project type selected, you will be required to provide
            the necessary options (framework-specific configurations, ports,
            etc.). StartMyDev will then generate the appropriate script for you.
          </p>
        </li>

        <li>
          Download the generated script and run it by:
          <ul>
            <li>
              Double-clicking the <code>.ps1</code> file
            </li>
            <li>
              Or executing it manually in PowerShell (right-click → Run with
              PowerShell or use terminal)
            </li>
          </ul>
        </li>

        <li>
          No need for VS Code, IntelliJ, or installing any dependencies
          manually.
        </li>
      </ol>

      <pre className="p-3 rounded bg-light text-dark dark:bg-dark dark:text-light">
        {`// Example setup:
OS: Windows
Application Type: Fullstack
Project: React + Spring Boot`}
      </pre>
    </div>
  );
};

export default GettingStarted;
