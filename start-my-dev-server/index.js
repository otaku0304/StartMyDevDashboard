const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");
const stream = require("stream");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const { resolveTemplatePath } = require("./templateResolver");

const app = express();


// 1. Security Headers
app.use(helmet());

// 2. CORS (Restrict in prod if needed, keep open for dev)
app.use(cors()); // Configure with specific origins in production

// 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);

app.use(express.json());

// 4. Input Sanitization Helper
const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  // Remove potentially dangerous characters for shell scripts
  // Allow alphanumeric, standard path chars, and common punctuation
  // But be careful with quotes and semicolons if not handled
  // For this generator, we'll strip characters that break out of strings or execute commands
  // This is a basic sanitizer; adjust based on threat model
  return input.replace(/[`$();|&<>]/g, "");
};

const readAndInject = async (filePath, values) => {
  let content = await fs.readFile(filePath, "utf8");
  for (const key in values) {
    const sanitizedValue = sanitizeInput(values[key] || "");
    content = content.replace(new RegExp(`{{${key}}}`, "g"), sanitizedValue);
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

  if (!gitBranch) {
    return res.status(400).json({
      responseCode: 400,
      responseMessage: `Missing or gitBranch.`,
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
