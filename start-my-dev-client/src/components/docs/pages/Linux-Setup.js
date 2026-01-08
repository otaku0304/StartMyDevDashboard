import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { windowsScriptDocs } from "../scriptOptions";
import { windowsData } from "./scriptData";

export const LinuxSetup = () => {
    const scriptLabels = windowsScriptDocs?.linux || [];
    const scriptConfigs = windowsData?.linux || [];

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
        <div className="container-fluid p-3">
            <Helmet>
                <title>{selectedScript.label} Linux Setup | StartMyDev</title>
                <meta name="description" content={`Learn how to setup and run ${selectedScript.label} on Linux using StartMyDev generated Bash scripts.`} />
            </Helmet>
            <div className="row align-items-center mb-4">
                <div className="col-12 col-md-8">
                    <h2 className="fw-bold text-dark">{selectedScript.fileName} Overview</h2>
                </div>
                <div className="col-12 col-md-4 mt-3 mt-md-0">
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
                <code>{selectedScript.fileName}</code> is a Bash script used to set up and launch a{" "}
                <strong>{selectedScript.label}</strong> project on Linux. The term{" "}
                <strong>{selectedScript.code}StartMyDev</strong> refers to{" "}
                <strong>{selectedScript.label}</strong>.
            </p>

            <h5 className="fw-semibold mb-3">What the script does</h5>
            <ul className="text-muted">
                <li>Displays an introductory banner with usage details</li>
                <li>Checks out the specified Git branch</li>
                <li>Initializes environment variables (like JAVA_HOME)</li>
                <li>Builds and runs the {selectedScript.label} application</li>
                <li>
                    Launches the {selectedScript.label} in a separate terminal window
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
                <li>Extract the downloaded zip file.</li>
                <li>
                    Open a terminal in the extracted directory.
                </li>
                <li>
                    Make the script executable:
                    <pre className="bg-light border p-2 mt-2 text-dark">
                        chmod +x {selectedScript.fileName}
                        <br />
                        chmod +x launch.sh
                    </pre>
                </li>
                <li>
                    Run the script:
                    <pre className="bg-light border p-2 mt-2 text-dark">
                        ./launch.sh
                    </pre>
                    or directly:
                    <pre className="bg-light border p-2 mt-2 text-dark">
                        ./{selectedScript.fileName}
                    </pre>
                </li>
            </ol>

            <h5 className="fw-semibold mt-5 mb-3">Result</h5>
            <p className="text-muted">
                The {selectedScript.label} project will automatically pull the latest code,
                configure the environment, and launch your {selectedScript.label} server in a new terminal window.
            </p>
        </div>
    );
};

export default LinuxSetup;
