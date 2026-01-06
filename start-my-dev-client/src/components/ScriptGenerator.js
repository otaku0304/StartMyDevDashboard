import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { handleErrorResponse } from "../core/tokenInterceptor/AxiosInstance";
import ScriptGeneratorService from "../service/ScriptGeneratorService";
import projectTypeMap from "./projectTypeMap";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco, dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Modal, Button } from "react-bootstrap";
import { FaSave, FaTrash, FaEye, FaTerminal, FaCode } from "react-icons/fa";

const scriptGenerateService = new ScriptGeneratorService();

const ScriptGenerator = () => {
  const initialFormState = {
    applicationType: "frontend",
    projectType: "React",
    powershellVersion: "5",
    os: "windows",
    frontendPath: "",
    backendPath: "",
    javaPath: "",
    pythonPath: "",
    springProfile: "",
    frontendPort: "",
    backendPort: "",
    gitBranch: "development",
  };

  const [form, setForm] = useState(initialFormState);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");
  const [savedConfigs, setSavedConfigs] = useState([]);
  const [configName, setConfigName] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check dark mode
  useEffect(() => {
    const isDark = document.getElementById("root-container")?.classList.contains("dark-mode");
    setDarkMode(!!isDark);
    // Listen for class changes on root (basic mutation observer alternative for simple global state)
    const observer = new MutationObserver(() => {
      const isNowDark = document.getElementById("root-container")?.classList.contains("dark-mode");
      setDarkMode(!!isNowDark);
    });
    const root = document.getElementById("root-container");
    if (root) observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Load Saved Configs
  useEffect(() => {
    const saved = localStorage.getItem("startmydev_configs");
    if (saved) {
      setSavedConfigs(JSON.parse(saved));
    }
  }, []);

  const resetForm = () => {
    setForm(initialFormState);
  };
  const getProjectTypeOptions = (appType = form.applicationType) => {
    if (appType === "frontend") return ["React", "Angular"];
    if (appType === "backend") return ["Spring Boot", "Flask"];
    if (appType === "fullstack")
      return ["Angular + Spring Boot", "React + Spring Boot"];
    return [];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };
      if (name === "applicationType") {
        const options = getProjectTypeOptions(value);
        updatedForm.projectType = options[0] || "";
      }
      return updatedForm;
    });
  };

  const getFrontendPortLabel = () => {
    if (form.projectType.toLowerCase().includes("react")) return "React Port";
    if (form.projectType.toLowerCase().includes("angular"))
      return "Angular Port";
    return "Frontend Port";
  };

  const getBackendPortLabel = () => {
    if (form.projectType.toLowerCase().includes("spring boot"))
      return "Spring Boot Port";
    if (form.projectType.toLowerCase().includes("flask")) return "Flask Port";
    if (form.projectType.toLowerCase().includes("node")) return "Node.js Port";
    return "Backend Port";
  };

  const isFullstack = form.applicationType === "fullstack";
  const isFrontend = form.applicationType === "frontend" || isFullstack;
  const isBackend = form.applicationType === "backend" || isFullstack;
  const isSpringBoot = form.projectType.includes("Spring Boot");
  const isFlask = form.projectType === "Flask";

  const getFrontendPathLabel = () => {
    if (form.applicationType === "frontend") {
      return form.projectType === "React"
        ? "React Project Path"
        : form.projectType === "Angular"
          ? "Angular Project Path"
          : "Frontend Project Path";
    } else if (isFullstack) {
      return "React/Angular Project Path";
    }
    return "Frontend Project Path";
  };

  const getBackendPathLabel = () => {
    if (form.applicationType === "backend") {
      if (form.projectType === "Spring Boot") return "Spring Boot Project Path";
      if (form.projectType === "Flask") return "Flask Project Path";
      if (form.projectType === "Node.js") return "Node.js Project Path";
      return "Backend Project Path";
    } else if (isFullstack) {
      return "Spring Boot Project Path";
    }
    return "Backend Project Path";
  };

  // --- Logic for Saved Configs ---
  const handleSaveConfig = () => {
    if (!configName) return toast.error("Please enter a name for this configuration.");
    const newConfigs = [...savedConfigs, { name: configName, config: form }];
    setSavedConfigs(newConfigs);
    localStorage.setItem("startmydev_configs", JSON.stringify(newConfigs));
    setShowSaveModal(false);
    setConfigName("");
    toast.success("Configuration saved!");
  };

  const loadConfig = (saved) => {
    setForm(saved.config);
    toast.info(`Loaded configuration: ${saved.name}`);
  };

  const deleteConfig = (index) => {
    const newConfigs = savedConfigs.filter((_, i) => i !== index);
    setSavedConfigs(newConfigs);
    localStorage.setItem("startmydev_configs", JSON.stringify(newConfigs));
    toast.success("Configuration deleted.");
  };

  // --- Logic for Preview ---
  const generatePreview = () => {
    // Mock logic for preview - in a real app this would call an API or use a local template engine
    const scriptType = form.os === "windows" ? "PowerShell" : "Bash";
    const commentChar = form.os === "windows" ? "#" : "#";

    let preview = `${commentChar} ${scriptType} Script Preview for ${form.projectType} (${form.os})\n\n`;
    preview += `${commentChar} Configuration\n`;
    if (form.frontendPath) preview += `Frontend Path: ${form.frontendPath}\n`;
    if (form.backendPath) preview += `Backend Path: ${form.backendPath}\n`;
    if (form.frontendPort) preview += `Frontend Port: ${form.frontendPort}\n`;
    if (form.backendPort) preview += `Backend Port: ${form.backendPort}\n`;
    preview += `Git Branch: ${form.gitBranch}\n\n`;
    preview += `${commentChar} Launching commands...\n`;
    if (form.os === "windows") {
      preview += `Write-Host "Starting services..."\nStart-Process ...`;
    } else {
      preview += `echo "Starting services..."\n./launch-services.sh ...`;
    }

    setGeneratedScript(preview);
    setShowPreview(true);
  }

  const handleSubmit = async () => {
    if (!["frontend", "backend", "fullstack"].includes(form.applicationType)) {
      toast.error("Invalid application type selected.");
      return;
    }

    if (!form.gitBranch) {
      toast.error("Invalid git branch selected.");
      return;
    }

    if (form.applicationType === "frontend") {
      if (!form.frontendPath) {
        toast.error(`Please provide the ${form.projectType} project path.`);
        return;
      }
      if (!form.frontendPort) {
        toast.error(`Please provide the ${form.projectType} port.`);
        return;
      }
    }

    if (form.applicationType === "backend") {
      if (!form.backendPath) {
        toast.error(`Please provide the ${form.projectType} project path.`);
        return;
      }
      if (!form.backendPort) {
        toast.error(`Please provide the ${form.projectType} port.`);
        return;
      }
    }

    if (form.applicationType === "fullstack") {
      if (!form.frontendPath || !form.backendPath) {
        toast.error("Please provide both frontend and backend project paths.");
        return;
      }
      if (!form.frontendPort || !form.backendPort) {
        toast.error("Please provide both frontend and backend ports.");
        return;
      }
    }

    const mappedProjectType =
      projectTypeMap[form.projectType] || form.projectType;

    const requestBody = Object.fromEntries(
      Object.entries({
        os: form.os,
        powershellVersion: form.powershellVersion,
        applicationType: form.applicationType,
        projectType: mappedProjectType,
        frontendPort: form.frontendPort,
        backendPort: form.backendPort,
        frontendPath: form.frontendPath,
        backendPath: form.backendPath,
        springProfile: form.springProfile,
        javaPath: form.javaPath,
        pythonPath: form.pythonPath,
        gitBranch: form.gitBranch,
      }).filter(([_, v]) => v !== null && v !== undefined && v !== "")
    );

    try {
      const response = await scriptGenerateService.scriptGenerate(requestBody);
      const { responseCode, responseBody } = response.data;

      if (responseCode === 200) {
        const { fileName, fileBase64 } = responseBody;
        const byteCharacters = atob(fileBase64);
        const byteNumbers = new Array(byteCharacters.length)
          .fill(0)
          .map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/zip" });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName || "StartMyDev.zip");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Script generated and downloaded successfully!");
        resetForm();
      }
    } catch (error) {
      handleErrorResponse("generate-api", error.response);
      resetForm();
    }
  };

  return (
    <div className={`container py-5 fade-in`}>

      {/* Saved Configs Sidebar/Panel */}
      {savedConfigs.length > 0 && (
        <div className="mb-4 d-flex gap-2 overflow-auto py-2">
          {savedConfigs.map((config, index) => (
            <div key={index} className={`card p-2 px-3 flex-row align-items-center gap-2 shadow-sm border-0 ${darkMode ? 'bg-secondary text-white' : 'bg-light'}`} style={{ minWidth: 'fit-content' }}>
              <span className="fw-bold small" style={{ cursor: 'pointer' }} onClick={() => loadConfig(config)}>{config.name}</span>
              <FaTrash className="text-danger" style={{ cursor: 'pointer' }} onClick={() => deleteConfig(index)} size={12} />
            </div>
          ))}
        </div>
      )}

      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">⚙️ StartMyDev Script Generator</h1>
        <p className="lead fw-normal">
          Quickly generate scripts to launch your frontend, backend,
          or fullstack project in seconds.
        </p>
      </div>

      <div className={`card shadow-lg border-0 rounded-4 p-4 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>

        {/* Header Actions */}
        <div className="d-flex justify-content-end mb-3 gap-2">
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" onClick={() => setShowSaveModal(true)}>
            <FaSave /> Save Config
          </button>
          <button className="btn btn-outline-info btn-sm d-flex align-items-center gap-1" onClick={generatePreview}>
            <FaEye /> Preview Script
          </button>
        </div>

        {/* OS Selection */}
        <div className="mb-4">
          <label className="form-label fw-bold">Operating System</label>
          <div className="d-flex gap-4 flex-wrap">
            {["windows", "linux", "mac"].map((os) => (
              <div className="form-check" key={os}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="os"
                  id={os}
                  value={os}
                  checked={form.os === os}
                  onChange={handleChange}
                  disabled={os !== "windows" && os !== "linux"}
                />
                <label
                  className={`form-check-label ${os !== "windows" ? "text-muted" : ""
                    }`}
                  htmlFor={os}
                >
                  {os.charAt(0).toUpperCase() + os.slice(1)}{" "}
                  {os !== "windows" && os !== "linux" && "(coming soon)"}
                </label>
              </div>
            ))}
          </div>
          <small className="text-muted">
            Windows and Linux are supported.
          </small>
        </div>

        {/* App Type + PowerShell */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-bold">Application Type</label>
            <div className="d-flex gap-3 flex-wrap">
              {["frontend", "backend", "fullstack"].map((type) => (
                <div key={type} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="applicationType"
                    id={type}
                    value={type}
                    checked={form.applicationType === type}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {form.os === "windows" && (
            <div className="col-md-6">
              <label className="form-label fw-bold">
                PowerShell Version (Windows Only)
              </label>
              <div className="d-flex gap-3">
                {["5", "7"].map((ver) => (
                  <div key={ver} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="powershellVersion"
                      id={`ps${ver}`}
                      value={ver}
                      checked={form.powershellVersion === ver}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`ps${ver}`}>
                      PowerShell {ver}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Type + Ports */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-bold">Project Type</label>
            <div className="d-flex flex-wrap gap-3">
              {getProjectTypeOptions().map((type) => (
                <div key={type} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="projectType"
                    id={type}
                    value={type}
                    checked={form.projectType === type}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={type}>
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Port Inputs */}
          {form.applicationType === "frontend" && (
            <div className="col-md-6">
              <label className="form-label fw-bold">
                {getFrontendPortLabel()}{" "}
              </label>

              <input
                className="form-control"
                name="frontendPort"
                value={form.frontendPort}
                onChange={handleChange}
                placeholder="e.g., 3000"
              />
            </div>
          )}
          {form.applicationType === "backend" && (
            <div className="col-md-6">
              <label className="form-label fw-bold">
                {getBackendPortLabel()}{" "}
              </label>

              <input
                className="form-control"
                name="backendPort"
                value={form.backendPort}
                onChange={handleChange}
                placeholder="e.g., 8080"
              />
            </div>
          )}
          {form.applicationType === "fullstack" && (
            <>
              <div className="col-md-6">
                <label className="form-label fw-bold">
                  {getFrontendPortLabel()}{" "}
                </label>

                <input
                  className="form-control"
                  name="frontendPort"
                  value={form.frontendPort}
                  onChange={handleChange}
                  placeholder="e.g., 3000"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">
                  {getBackendPortLabel()}
                </label>

                <input
                  className="form-control"
                  name="backendPort"
                  value={form.backendPort}
                  onChange={handleChange}
                  placeholder="e.g., 8080"
                />
              </div>
            </>
          )}
        </div>

        {/* Project Paths */}
        <div className="row mb-4">
          {isFrontend && (
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                {getFrontendPathLabel()}
              </label>
              <input
                className="form-control"
                name="frontendPath"
                value={form.frontendPath}
                onChange={handleChange}
                placeholder="e.g., C:\\path\\to\\frontend"
              />
            </div>
          )}
          {isBackend && (
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                {getBackendPathLabel()}
              </label>
              <input
                className="form-control"
                name="backendPath"
                value={form.backendPath}
                onChange={handleChange}
                placeholder="e.g., C:\\path\\to\\backend"
              />
            </div>
          )}
        </div>

        {/* Spring Boot Extras */}
        {(isSpringBoot || isFlask) && (
          <div className="row mb-4">
            {isSpringBoot && (
              <>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Java Path (optional)
                  </label>
                  <input
                    className="form-control"
                    name="javaPath"
                    value={form.javaPath}
                    onChange={handleChange}
                    placeholder="Will use system default if not provided"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Spring Profile</label>
                  <input
                    className="form-control"
                    name="springProfile"
                    value={form.springProfile}
                    onChange={handleChange}
                    placeholder="e.g., local, dev, prod"
                  />
                </div>
              </>
            )}
            {isFlask && (
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  Python Path (optional)
                </label>
                <input
                  className="form-control"
                  name="pythonPath"
                  value={form.pythonPath}
                  onChange={handleChange}
                  placeholder="Will use system default if not provided"
                />
              </div>
            )}
          </div>
        )}

        {/* Git Branch */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Git Branch (optional)</label>
            <input
              className="form-control"
              name="gitBranch"
              value={form.gitBranch}
              onChange={handleChange}
              placeholder="e.g., development, main"
            />
          </div>
        </div>
        {/* Submit */}
        <div className="text-center mt-4">
          <button className="btn btn-primary px-5" onClick={handleSubmit}>
            Generate & Download
          </button>
        </div>
      </div>

      {/* Save Config Modal */}
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)} centered>
        <Modal.Header closeButton className={darkMode ? 'bg-dark text-white' : ''}>
          <Modal.Title>Save Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? 'bg-dark text-white' : ''}>
          <div className="mb-3">
            <label className="form-label">Configuration Name</label>
            <input type="text" className="form-control" value={configName} onChange={(e) => setConfigName(e.target.value)} placeholder="e.g. Work Backend" autoFocus />
          </div>
        </Modal.Body>
        <Modal.Footer className={darkMode ? 'bg-dark text-white' : ''}>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveConfig}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Preview Modal */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
        <Modal.Header closeButton className={darkMode ? 'bg-dark text-white border-secondary' : ''}>
          <Modal.Title className="d-flex align-items-center gap-2">
            <FaCode /> Script Preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? 'bg-dark text-white' : 'bg-light'}>
          <SyntaxHighlighter language={form.os === 'windows' ? 'powershell' : 'bash'} style={darkMode ? dracula : docco} customStyle={{ borderRadius: '8px', padding: '20px' }}>
            {generatedScript}
          </SyntaxHighlighter>
        </Modal.Body>
        <Modal.Footer className={darkMode ? 'bg-dark text-white border-secondary' : ''}>
          <Button variant="secondary" onClick={() => setShowPreview(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default ScriptGenerator;
