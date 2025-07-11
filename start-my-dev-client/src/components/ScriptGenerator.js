import { useState } from "react";
import axios from "axios";

const ScriptGenerator = () => {
  const [form, setForm] = useState({
    applicationType: "frontend",
    projectType: "React",
    powershellVersion: "5",
    os: "windows",
    frontendPath: "",
    backendPath: "",
    javaPath: "",
    springProfile: "",
    port: "",
  });

  const getProjectTypeOptions = (appType = form.applicationType) => {
    if (appType === "frontend") return ["React", "Angular"];
    if (appType === "backend") return ["Spring Boot", "Flask", "Node.js"];
    if (appType === "fullstack") return ["React or Angular + Spring Boot"];
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
      return "React/Angular JS Project Path";
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
    if (isFullstack && (!form.frontendPath || !form.backendPath)) {
      alert("Please provide both React/Angular and Spring Boot project paths.");
      return;
    }

    if (form.applicationType === "frontend" && !form.frontendPath) {
      alert(
        `Please provide the ${form.projectType || "frontend"} project path.`
      );
      return;
    }

    if (form.applicationType === "backend" && !form.backendPath) {
      alert(
        `Please provide the ${form.projectType || "backend"} project path.`
      );
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/generate", form, {
        responseType: "blob",
      });

      const contentDisposition = res.headers["content-disposition"];
      const fileName =
        contentDisposition?.split("filename=")[1]?.replace(/['"]/g, "") ||
        "launch.ps1"; // fallback name

      const blob = new Blob([res.data], { type: "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // ✅ Reset the form
      setForm({
        applicationType: "frontend",
        projectType: "React",
        powershellVersion: "5",
        os: "windows",
        frontendPath: "",
        backendPath: "",
        javaPath: "",
        springProfile: "",
        port: "",
      });
    } catch (err) {
      alert("Something went wrong while generating the script.");
      console.error(err);
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
          <small className="text-muted">Currently, only Windows is supported.</small>
        </div>

        {/* Application Type + PowerShell */}
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

        {/* Project Type + Port */}
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
                    disabled={isFullstack}
                  />
                  <label className="form-check-label" htmlFor={type}>
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Port (optional)</label>
            <input
              className="form-control"
              name="port"
              value={form.port}
              onChange={handleChange}
              placeholder="e.g., 8080 or 3000"
            />
          </div>
        </div>

        {/* Project Paths */}
        <div className="row mb-4">
          {isFrontend && (
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">{getFrontendPathLabel()}</label>
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
              <label className="form-label fw-bold">{getBackendPathLabel()}</label>
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
              <label className="form-label fw-bold">Spring Profile (optional)</label>
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

        {/* Submit Button */}
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
