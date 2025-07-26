import { useState, useEffect } from "react";
import { windowsScriptDocs } from "../scriptOptions";
import { windowsData } from "./scriptData";

export const Ps5Setup = () => {
  const scriptLabels = windowsScriptDocs?.ps5 || [];
  const scriptConfigs = windowsData?.ps5 || [];

  const [selectedLabel, setSelectedLabel] = useState(
    scriptLabels.find((s) => s.label === "SpringBoot")?.label ||
      scriptLabels[0]?.label ||
      ""
  );

  const [selectedScript, setSelectedScript] = useState(null);

  useEffect(() => {
    let match = scriptConfigs.find((s) => s.label === selectedLabel);

    if (!match) {
      const fallbackLabel =
        scriptConfigs.find((s) => s.label === "SpringBoot")?.label ||
        scriptConfigs[0]?.label ||
        "";
      setSelectedLabel(fallbackLabel);
      return;
    }

    setSelectedScript(match);
  }, [selectedLabel, scriptConfigs]);

  const handleSelect = (e) => {
    setSelectedLabel(e.target.value);
  };

  if (!selectedScript) {
    return <div className="text-danger p-3">No script details available.</div>;
  }

  return (
    <div className="ps-3 pe-3">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="fw-bold text-dark mb-4">
          {selectedScript.fileName} Overview
        </h2>

        <div className="mb-4">
          <select
            className="form-select"
            value={selectedLabel}
            onChange={handleSelect}
          >
            {scriptLabels.map((script) => (
              <option key={script.label} value={script.label}>
                {script.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-muted mb-4">
        <code>{selectedScript.fileName}</code> is a PowerShell script used to
        set up and launch a <strong>{selectedScript.label}</strong> project. The
        term <strong>{selectedScript.code}StartMyDev</strong> refers to{" "}
        <strong>{selectedScript.label}</strong>.
      </p>

      <h5 className="fw-semibold mb-3">What the script does</h5>
      <ul className="text-muted">
        <li>Displays an introductory banner with usage details</li>
        <li>Initializes environment variables</li>
        <li>Builds and runs the {selectedScript.label}</li>
        <li>
          Launches the {selectedScript.label} in a separate PowerShell{" "}
          {selectedScript.powershellVersion} window
        </li>
      </ul>

      <h5 className="fw-semibold mt-5 mb-3">Configurable Parameters</h5>
      <ul className="text-muted">
        {selectedScript.parameters?.length > 0 ? (
          selectedScript.parameters.map((param) => (
            <li key={param}>
              <code>{param}</code>
            </li>
          ))
        ) : (
          <li>
            <em>No parameters available</em>
          </li>
        )}
      </ul>

      <h5 className="fw-semibold mt-5 mb-3">Usage Instructions</h5>
      <ol className="text-muted">
        <li>Update the script with your actual file paths and values</li>
        <li>
          Execute the script:
          <pre className="bg-light border p-2 mt-2 text-dark">
            {selectedScript.fileName}
          </pre>
        </li>
      </ol>

      <h5 className="fw-semibold mt-5 mb-3">Result</h5>
      <p className="text-muted">
        The {selectedScript.label} project will automatically pull the latest
        code, configure the environment, and launch your {selectedScript.label}{" "}
        server in a new powershell {selectedScript.powershellVersion} window.
      </p>
    </div>
  );
};

export default Ps5Setup;
