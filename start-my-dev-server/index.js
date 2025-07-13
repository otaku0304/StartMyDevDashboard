const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");

const app = express();
app.use(cors());
app.use(express.json());

const BASE_TEMPLATE_PATH = path.join(__dirname, "scripts");
const SESSIONS_DIR = path.join(__dirname, "sessions");

// Builds the full template path
const getFolderName = ({ os, powershellVersion, frontend, backend }) => {
  const folderPath = path.join(
    BASE_TEMPLATE_PATH,
    `${os}-ps${powershellVersion}`,
    `${frontend}${backend}QuickStart`
  );
  console.log("📁 Using Template Folder:", folderPath);
  return folderPath;
};

// Injects user values into .bat and .ps1 files
const injectValues = async (folder, values) => {
  const files = await fs.readdir(folder);
  for (const file of files) {
    const filePath = path.join(folder, file);
    const stat = await fs.stat(filePath);

    if (stat.isFile()) {
      let content = await fs.readFile(filePath, "utf8");
      for (const key in values) {
        content = content.replace(new RegExp(`{{${key}}}`, "g"), values[key]);
      }
      await fs.writeFile(filePath, content);
    }
  }
};

// Main endpoint to generate files
app.post("/generate", async (req, res) => {
  const {
    os = "windows",
    powershellVersion = "5",
    port = "",
    springProfile = "",
    javaPath = "",
    frontendPath = "",
    backendPath = "",
    frontend,
    backend,
  } = req.body;

  // ✅ Validate required fields
  if (!frontend || !backend) {
    return res
      .status(400)
      .json({ responseCode: 400, responseMessage: "Missing 'frontend' or 'backend' type in request." });
  }

  const templatePath = getFolderName({ os, powershellVersion, frontend, backend });

  if (!fs.existsSync(templatePath)) {
    return res.status(404).json({
      responseCode: 404,
      responseMessage: "Template not found.",
    });
  }

  try {
    const sessionId = `session-${Date.now()}`;
    const sessionPath = path.join(SESSIONS_DIR, sessionId);
    await fs.copy(templatePath, sessionPath);

    await injectValues(sessionPath, {
      PORT: port,
      SPRING_PROFILE: springProfile,
      JAVA_PATH: javaPath,
      FRONTEND_PATH: frontendPath,
      BACKEND_PATH: backendPath,
    });

    const zipPath = path.join(SESSIONS_DIR, `${sessionId}.zip`);
    const archive = archiver("zip", { zlib: { level: 9 } });
    const output = fs.createWriteStream(zipPath);

    await new Promise((resolve, reject) => {
      archive.directory(sessionPath, "StartMyDev");
      archive.pipe(output);
      archive.finalize();
      output.on("close", resolve);
      archive.on("error", reject);
    });

    // Convert zip to base64
    const zipBuffer = await fs.readFile(zipPath);
    const base64Zip = zipBuffer.toString("base64");

    // Clean up
    setTimeout(() => {
      fs.remove(sessionPath);
      fs.remove(zipPath);
    }, 60 * 1000);

    return res.status(200).json({
      responseCode: 200,
      responseMessage: "Script generated successfully.",
      responseBody: {
        fileName: "StartMyDev.zip",
        fileBase64: base64Zip,
      },
    });
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
