import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import ScriptGenerator from "../components/ScriptGenerator";
import DocLayout from "../components/docs/DocLayout";
import GettingStarted from "../components/docs/pages/GettingStarted";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/script-generator" element={<ScriptGenerator />} />
      <Route path="/docs" element={<DocLayout />}>
        <Route index element={<GettingStarted />} />
        <Route path="getting-started" element={<GettingStarted />} />
        {/* <Route path="configuration" element={<Configuration />} />
        <Route path="generate" element={<ScriptGeneration />} />
        <Route path="spring-boot" element={<SpringBootSetup />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
