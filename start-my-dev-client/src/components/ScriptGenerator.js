import { useState } from "react";
import { toast } from "react-toastify";
import { handleErrorResponse } from "../core/tokenInterceptor/AxiosInstance";
import ScriptGeneratorService from "../service/ScriptGeneratorService";
import projectTypeMap from "./projectTypeMap";

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
    springProfile: "",
    frontendPort: "",
    backendPort: "",
    gitBranch: "development",
  };

  const [form, setForm] = useState(initialFormState);
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

  const handleSubmit = async () => {
    if (!["frontend", "backend", "fullstack"].includes(form.applicationType)) {
      toast.error("Invalid application type selected.");
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
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">⚙️ StartMyDev Script Generator</h1>
        <p className="lead fw-normal">
          Quickly generate PowerShell scripts to launch your frontend, backend,
          or fullstack project in seconds.
        </p>
      </div>

      <div className="card shadow-lg border-0 rounded-4 p-4">
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
                  disabled={os !== "windows"}
                />
                <label
                  className={`form-check-label ${
                    os !== "windows" ? "text-muted" : ""
                  }`}
                  htmlFor={os}
                >
                  {os.charAt(0).toUpperCase() + os.slice(1)}{" "}
                  {os !== "windows" && "(coming soon)"}
                </label>
              </div>
            ))}
          </div>
          <small className="text-muted">
            Currently, only Windows is supported.
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
          <div className="col-md-6">
            <label className="form-label fw-bold">PowerShell Version</label>
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
        {isSpringBoot && (
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Java Path (optional)</label>
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
    </div>
  );
};

export default ScriptGenerator;
