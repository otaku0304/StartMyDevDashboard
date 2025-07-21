const path = require("path");
const templateRegistry = require("./templateRegistry");

const BASE_TEMPLATE_PATH = path.join(__dirname, "scripts");

const getNormalizedProjectType = (applicationType, projectType) => {
  if (applicationType === "fullstack") {
    if (!Array.isArray(projectType) || projectType.length !== 2) {
      throw new Error("Invalid projectType format for fullstack.");
    }
    return `${projectType[0]}+${projectType[1]}`;
  }
  return projectType;
};

const resolveTemplatePath = ({
  os,
  powershellVersion,
  applicationType,
  projectType,
}) => {
  const normalizedProjectType = getNormalizedProjectType(
    applicationType,
    projectType
  );

  const match = templateRegistry.find(
    (tpl) =>
      tpl.applicationType === applicationType &&
      tpl.projectType === normalizedProjectType
  );

  if (!match) {
    throw new Error("Unsupported applicationType + projectType combination.");
  }

  const folderPath = path.join(
    BASE_TEMPLATE_PATH,
    `${os}-ps${powershellVersion}`,
    match.folder
  );

  console.log("Resolved Template Path:", folderPath);
  return folderPath;
};

module.exports = { resolveTemplatePath };
