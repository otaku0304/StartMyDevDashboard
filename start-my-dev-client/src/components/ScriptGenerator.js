import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { handleErrorResponse } from "../core/tokenInterceptor/AxiosInstance";
import ScriptGeneratorService from "../service/ScriptGeneratorService";
import projectTypeMap from "./projectTypeMap";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco, dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Modal, Button } from "react-bootstrap";
import {
  FaSave,
  FaTrash,
  FaEye,
  FaTerminal,
  FaCopy,
  FaWindows,
  FaLinux,
  FaApple,
  FaServer,
  FaLaptopCode,
  FaLayerGroup,
  FaMagic
} from "react-icons/fa";

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
    const checkDarkMode = () => {
      const isDark = document.getElementById("root-container")?.classList.contains("dark-mode");
      setDarkMode(!!isDark);
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
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

  const updateFormValue = (name, value) => {
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
    const trimmedName = configName.trim();

    if (!trimmedName) {
      return toast.error("Please enter a valid name for this configuration.");
    }

    if (savedConfigs.some(config => config.name.toLowerCase() === trimmedName.toLowerCase())) {
      return toast.error("A configuration with this name already exists. Please choose a different name.");
    }

    const newConfigs = [...savedConfigs, { name: trimmedName, config: form }];
    setSavedConfigs(newConfigs);
    localStorage.setItem("startmydev_configs", JSON.stringify(newConfigs));
    setShowSaveModal(false);
    setConfigName("");
    toast.success("Configuration saved successfully!");
  };

  const loadConfig = (saved) => {
    setForm(saved.config);
    toast.info(`Loaded configuration: ${saved.name}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteConfig = (e, index) => {
    e.stopPropagation();
    const newConfigs = savedConfigs.filter((_, i) => i !== index);
    setSavedConfigs(newConfigs);
    localStorage.setItem("startmydev_configs", JSON.stringify(newConfigs));
    toast.success("Configuration deleted.");
  };

  // --- Logic for Preview ---
  const generatePreview = () => {
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

    // Validation logic...
    if (form.applicationType === "frontend") {
      if (!form.frontendPath) return toast.error(`Please provide the ${form.projectType} project path.`);
      if (!form.frontendPort) return toast.error(`Please provide the ${form.projectType} port.`);
      if (isNaN(form.frontendPort)) return toast.error(`${form.projectType} port must be a number.`);
    }

    if (form.applicationType === "backend") {
      if (!form.backendPath) return toast.error(`Please provide the ${form.projectType} project path.`);
      if (!form.backendPort) return toast.error(`Please provide the ${form.projectType} port.`);
      if (isNaN(form.backendPort)) return toast.error(`${form.projectType} port must be a number.`);
    }

    if (form.applicationType === "fullstack") {
      if (!form.frontendPath || !form.backendPath) return toast.error("Please provide both frontend and backend project paths.");
      if (!form.frontendPort || !form.backendPort) return toast.error("Please provide both frontend and backend ports.");
      if (isNaN(form.frontendPort) || isNaN(form.backendPort)) return toast.error("Ports must be numeric values.");
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
    <div className="container py-5 fade-in">
      <Helmet>
        <title>Script Generator | StartMyDev</title>
        <meta name="description" content="Generate custom windows and linux scripts for your development stack." />
      </Helmet>

      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">
          <span className="text-gradient">Automate Your Setup</span>
        </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
          Configure, generate, and launch your development environment in seconds.
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Saved Configs - New "Workspaces" Layout */}
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold m-0 d-flex align-items-center gap-2">
              <FaSave className="text-primary" /> Saved Workspaces
            </h5>
            {savedConfigs.length > 0 && (
              <button
                className="btn btn-sm btn-link text-muted text-decoration-none"
                onClick={() => {
                  if (window.confirm("Clear all workspaces?")) {
                    setSavedConfigs([]);
                    localStorage.removeItem("startmydev_configs");
                  }
                }}
              >
                Clear All
              </button>
            )}
          </div>

          {savedConfigs.length === 0 ? (
            <div className={`p-4 rounded-4 border border-dashed text-center ${darkMode ? 'border-secondary' : 'border-light'}`}>
              <p className="text-muted m-0 small">No saved workspaces yet. Configure below and save to get started.</p>
            </div>
          ) : (
            <div className="row g-3">
              {savedConfigs.map((config, index) => (
                <div key={index} className="col-md-3 col-sm-6">
                  <div
                    className={`card h-100 p-3 border-0 shadow-sm hover-lift workspace-card cursor-pointer position-relative overflow-hidden ${darkMode ? 'bg-surface-dark' : 'bg-surface-light'}`}
                    onClick={() => loadConfig(config)}
                  >
                    <div className="position-absolute top-0 start-0 w-1 h-100 bg-primary"></div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="fw-bold text-truncate" title={config.name}>{config.name}</span>
                      <button
                        className="btn btn-sm btn-icon p-0 text-muted hover-danger"
                        onClick={(e) => deleteConfig(e, index)}
                        title="Delete Workspace"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                    <div className="small text-muted mb-1">
                      {config.config.os === 'windows' ? <FaWindows className="me-1" /> : <FaLinux className="me-1" />}
                      {config.config.projectType}
                    </div>
                    <div className="mt-auto pt-2 border-top border-light-subtle d-flex justify-content-between align-items-center">
                      <span className="badge bg-primary-subtle text-primary rounded-pill" style={{ fontSize: '0.65rem' }}>
                        {config.config.applicationType}
                      </span>
                      <small className="text-primary fw-bold" style={{ fontSize: '0.7rem' }}>Load →</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Generator Card */}
        <div className="col-lg-9">
          <div className={`card shadow-lg border-0 rounded-4 overflow-hidden ${darkMode ? 'bg-surface-dark border-secondary' : 'bg-white'}`}>
            <div className="p-1 bg-gradient-primary"></div> {/* Top accent line */}

            <div className={`p-4 p-md-5 ${darkMode ? 'text-white' : ''}`}>

              {/* Header with Save Button */}
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h4 className="fw-bold m-0"><FaMagic className="me-2 text-primary" /> Configuration</h4>
                <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={() => setShowSaveModal(true)}>
                  <FaSave className="me-1" /> Save as Workspace
                </button>
              </div>

              {/* OS Selection */}
              <div className="mb-5">
                <label className="form-label text-muted fw-bold small text-uppercase letter-spacing-1 mb-3">Operating System</label>
                <div className="d-flex gap-3">
                  {[
                    { id: 'windows', icon: FaWindows, label: 'Windows' },
                    { id: 'linux', icon: FaLinux, label: 'Linux (Bash)' },
                    { id: 'mac', icon: FaApple, label: 'MacOS', disabled: true }
                  ].map(os => (
                    <div
                      key={os.id}
                      className={`os-card flex-grow-1 p-3 rounded-3 border text-center cursor-pointer transition-all ${form.os === os.id ? 'active-os border-primary bg-primary-subtle text-primary' :
                        os.disabled ? 'opacity-50 cursor-not-allowed bg-light' : 'hover-border-primary'
                        } ${darkMode && form.os !== os.id ? 'border-secondary bg-dark' : ''}`}
                      onClick={() => !os.disabled && updateFormValue('os', os.id)}
                    >
                      <os.icon size={24} className="mb-2" />
                      <div className="fw-semibold">{os.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Stack */}
              <div className="mb-5">
                <label className="form-label text-muted fw-bold small text-uppercase letter-spacing-1 mb-3">Stack</label>
                <div className="row g-3">
                  {[
                    { id: 'frontend', icon: FaLaptopCode, label: 'Frontend', desc: 'React, Angular' },
                    { id: 'backend', icon: FaServer, label: 'Backend', desc: 'Spring Boot, Flask' },
                    { id: 'fullstack', icon: FaLayerGroup, label: 'Fullstack', desc: 'Combined Architecture' }
                  ].map(type => (
                    <div className="col-md-4" key={type.id}>
                      <div
                        className={`h-100 p-3 rounded-3 border cursor-pointer transition-all ${form.applicationType === type.id ? 'border-primary bg-primary-subtle' : 'hover-border-primary'
                          } ${darkMode && form.applicationType !== type.id ? 'border-secondary bg-dark' : ''}`}
                        onClick={() => updateFormValue('applicationType', type.id)}
                      >
                        <div className={`d-flex align-items-center mb-2 ${form.applicationType === type.id ? 'text-primary' : ''}`}>
                          <type.icon className="me-2" />
                          <span className="fw-bold">{type.label}</span>
                        </div>
                        <small className="text-muted d-block">{type.desc}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="row g-4 mb-4">
                <div className="col-12">
                  <label className="form-label text-muted fw-bold small text-uppercase letter-spacing-1">Technology</label>
                  <select
                    className="form-select form-select-lg"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                  >
                    {getProjectTypeOptions().map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {/* Conditional Fields based on selection */}
                {form.applicationType === 'frontend' && (
                  <>
                    <div className="col-md-8">
                      <label className="form-label fw-semibold">{getFrontendPathLabel()}</label>
                      <input className="form-control" name="frontendPath" value={form.frontendPath} onChange={handleChange} placeholder="Absolute path to project" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">{getFrontendPortLabel()}</label>
                      <input className="form-control" name="frontendPort" value={form.frontendPort} onChange={handleChange} placeholder="3000" />
                    </div>
                  </>
                )}

                {form.applicationType === 'backend' && (
                  <>
                    <div className="col-md-8">
                      <label className="form-label fw-semibold">{getBackendPathLabel()}</label>
                      <input className="form-control" name="backendPath" value={form.backendPath} onChange={handleChange} placeholder="Absolute path to project" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">{getBackendPortLabel()}</label>
                      <input className="form-control" name="backendPort" value={form.backendPort} onChange={handleChange} placeholder="8080" />
                    </div>
                  </>
                )}

                {form.applicationType === 'fullstack' && (
                  <>
                    <div className="col-md-8">
                      <label className="form-label fw-semibold">{getFrontendPathLabel()}</label>
                      <input className="form-control" name="frontendPath" value={form.frontendPath} onChange={handleChange} placeholder="Path to frontend" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">{getFrontendPortLabel()}</label>
                      <input className="form-control" name="frontendPort" value={form.frontendPort} onChange={handleChange} />
                    </div>
                    <div className="col-md-8">
                      <label className="form-label fw-semibold">{getBackendPathLabel()}</label>
                      <input className="form-control" name="backendPath" value={form.backendPath} onChange={handleChange} placeholder="Path to backend" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">{getBackendPortLabel()}</label>
                      <input className="form-control" name="backendPort" value={form.backendPort} onChange={handleChange} />
                    </div>
                  </>
                )}

                {/* Extras */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Git Branch</label>
                  <input className="form-control" name="gitBranch" value={form.gitBranch} onChange={handleChange} placeholder="development" />
                </div>

                {/* Spring Boot Extras */}
                {isSpringBoot && (
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Spring Profile</label>
                    <input className="form-control" name="springProfile" value={form.springProfile} onChange={handleChange} placeholder="local" />
                  </div>
                )}

                {/* Windows PowerShell Version */}
                {form.os === 'windows' && (
                  <div className="col-12 mt-4">
                    <label className="form-label fw-bold small text-uppercase text-muted">PowerShell Version</label>
                    <div className="d-flex gap-3">
                      {['5', '7'].map(v => (
                        <div key={v} className="form-check">
                          <input className="form-check-input" type="radio" name="powershellVersion" id={`ps${v}`} value={v} checked={form.powershellVersion === v} onChange={handleChange} />
                          <label className="form-check-label" htmlFor={`ps${v}`}>PowerShell {v}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-5 pt-3 border-top border-light-subtle">
                <button className="btn btn-lg btn-outline-secondary px-4 d-flex align-items-center justify-content-center gap-2" onClick={generatePreview}>
                  <FaEye /> Preview
                </button>
                <button className="btn btn-lg btn-primary px-5 d-flex align-items-center justify-content-center gap-2 shadow hover-lift" onClick={handleSubmit}>
                  <FaTerminal /> Generate Script
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Save Config Modal */}
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)} centered contentClassName={`rounded-4 border-0 ${darkMode ? 'bg-dark' : ''}`}>
        <Modal.Header closeButton className={`border-0 border-bottom ${darkMode ? 'border-secondary' : ''}`}>
          <Modal.Title className={darkMode ? 'text-white' : ''}>Save Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? 'text-white' : ''}>
          <div className="mb-3">
            <label className="form-label">Configuration Name</label>
            <input type="text" className="form-control" value={configName} onChange={(e) => setConfigName(e.target.value)} placeholder="e.g. Work Backend" autoFocus />
            <div className="form-text text-muted">This will save your current form state to your browser.</div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="link" className="text-muted text-decoration-none" onClick={() => setShowSaveModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveConfig}>Save Configuration</Button>
        </Modal.Footer>
      </Modal>

      {/* Preview Modal */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered contentClassName="border-0 rounded-4 overflow-hidden">
        <Modal.Body className="p-0">
          <div className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              <div className="rounded-circle bg-danger" style={{ width: 12, height: 12 }}></div>
              <div className="rounded-circle bg-warning" style={{ width: 12, height: 12 }}></div>
              <div className="rounded-circle bg-success" style={{ width: 12, height: 12 }}></div>
            </div>
            <div className="font-monospace small opacity-50">preview</div>
            <FaCopy className="cursor-pointer hover-text-white" onClick={() => { navigator.clipboard.writeText(generatedScript); toast.success("Copied!"); }} />
          </div>
          <div style={{ maxHeight: '60vh', overflow: 'auto', backgroundColor: '#282a36' }}>
            <SyntaxHighlighter language={form.os === 'windows' ? 'powershell' : 'bash'} style={dracula} customStyle={{ margin: 0, padding: '20px' }}>
              {generatedScript}
            </SyntaxHighlighter>
          </div>
        </Modal.Body>
      </Modal>

      <style>{`
        .bg-surface-light { background-color: #f8f9fa; }
        .bg-surface-dark { background-color: #1e2533; } /* Custom darker shade */
        .hover-border-primary:hover { border-color: var(--color-primary) !important; color: var(--color-primary); }
        .bg-gradient-primary { background: var(--gradient-primary); height: 4px; }
        .bg-primary-subtle { background-color: rgba(79, 70, 229, 0.1) !important; }
        .active-os { box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2); }
        .hover-danger:hover { color: #dc3545 !important; }
        .workspace-card::before {
           content: ''; position: absolute; top:0; left:0; width:100%; height:100%;
           background: linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.05) 100%);
           opacity: 0; transition: opacity 0.3s;
        }
        .workspace-card:hover::before { opacity: 1; }
      `}</style>
    </div>
  );
};

export default ScriptGenerator;
