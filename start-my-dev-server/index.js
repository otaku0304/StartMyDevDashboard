const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");
const stream = require("stream");

const { resolveTemplatePath } = require("./templateResolver");

const app = express();
app.use(cors());
app.use(express.json());

const readAndInject = async (filePath, values) => {
  let content = await fs.readFile(filePath, "utf8");
  for (const key in values) {
    content = content.replace(new RegExp(`{{${key}}}`, "g"), values[key]);
  }
  return content;
};

app.post("/generate", async (req, res) => {
  const {
    os,
    powershellVersion,
    port,
    springProfile,
    javaPath,
    pythonPath,
    frontendPath,
    backendPath,
    applicationType,
    projectType,
    frontendPort,
    backendPort,
    gitBranch,
  } = req.body;

  const validAppTypes = ["frontend", "backend", "fullstack"];
  if (!applicationType || !validAppTypes.includes(applicationType)) {
    return res.status(400).json({
      responseCode: 400,
      responseMessage:
        "Invalid or missing 'applicationType'. Expected 'frontend', 'backend', or 'fullstack'.",
    });
  }

  if (
    (applicationType === "frontend" && !projectType) ||
    (applicationType === "backend" && !projectType) ||
    (applicationType === "fullstack" && !Array.isArray(projectType))
  ) {
    return res.status(400).json({
      responseCode: 400,
      responseMessage: `Missing or invalid 'projectType' for ${applicationType} application.`,
    });
  }

  if (applicationType === "frontend" && !frontendPort && !port) {
    return res.status(400).json({
      responseCode: 400,
      responseMessage: "Missing 'frontendPort' for frontend application.",
    });
  }

  if (applicationType === "backend" && !backendPort && !port) {
    return res.status(400).json({
      responseCode: 400,
      responseMessage: "Missing 'backendPort' for backend application.",
    });
  }

  if (applicationType === "fullstack" && (!frontendPort || !backendPort)) {
    return res.status(400).json({
      responseCode: 400,
      responseMessage:
        "Missing both 'frontendPort' and 'backendPort' for fullstack application.",
    });
  }

  let templatePath;
  try {
    templatePath = resolveTemplatePath({
      os,
      powershellVersion,
      applicationType,
      projectType,
    });
  } catch (err) {
    return res.status(400).json({
      responseCode: 400,
      responseMessage: err.message,
    });
  }

  if (!fs.existsSync(templatePath)) {
    return res.status(404).json({
      responseCode: 404,
      responseMessage: "Template not found.",
    });
  }

  try {
    const files = await fs.readdir(templatePath);
    const archiveStream = new stream.PassThrough();
    const archive = archiver("zip", { zlib: { level: 9 } });

    const zipChunks = [];
    archiveStream.on("data", (chunk) => zipChunks.push(chunk));

    let resolvedFrontendPort = "";
    let resolvedBackendPort = "";

    if (applicationType === "frontend") {
      resolvedFrontendPort = frontendPort || port;
    } else if (applicationType === "backend") {
      resolvedBackendPort = backendPort || port;
    } else if (applicationType === "fullstack") {
      resolvedFrontendPort = frontendPort || "";
      resolvedBackendPort = backendPort || "";
    }

    const injectMap = {
      FRONTEND_PORT: resolvedFrontendPort,
      BACKEND_PORT: resolvedBackendPort,
      SPRING_PROFILE: springProfile,
      JAVA_PATH: javaPath,
      PYTHON_PATH: pythonPath,
      FRONTEND_PATH: frontendPath,
      BACKEND_PATH: backendPath,
      GIT_BRANCH: gitBranch,
    };

    archive.pipe(archiveStream);

    for (const file of files) {
      const filePath = path.join(templatePath, file);
      const stat = await fs.stat(filePath);
      if (stat.isFile()) {
        const injectedContent = await readAndInject(filePath, injectMap);
        archive.append(injectedContent, { name: `StartMyDev/${file}` });
      }
    }

    archiveStream.on("finish", () => {
      const zipBuffer = Buffer.concat(zipChunks);
      const base64Zip = zipBuffer.toString("base64");

      return res.status(200).json({
        responseCode: 200,
        responseMessage: "Script generated successfully.",
        responseBody: {
          fileName: "StartMyDev.zip",
          fileBase64: base64Zip,
        },
      });
    });

    await archive.finalize();
  } catch (err) {
    console.error("❌ Error generating script:", err);
    return res.status(500).json({
      responseCode: 500,
      responseMessage: "Server error generating files.",
    });
  }
});

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
