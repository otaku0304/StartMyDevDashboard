import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import ScriptGenerator from "../components/ScriptGenerator";
import DocLayout from "../components/docs/DocLayout";
import GettingStarted from "../components/docs/pages/GettingStarted";
import PrivacyAndSecurity from "../components/docs/pages/PrivacyAndSecurity";
import Ps5Setup from "../components/docs/pages/Ps5-Setup";
import Ps7Setup from "../components/docs/pages/Ps7-Setup";
import LinuxSetup from "../components/docs/pages/Linux-Setup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/script-generator" element={<ScriptGenerator />} />
      <Route path="/docs" element={<DocLayout />}>
        <Route index element={<GettingStarted />} />
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="privacy-security" element={<PrivacyAndSecurity />} />
        <Route path="windows/ps5" element={<Ps5Setup />} />
        <Route path="windows/ps7" element={<Ps7Setup />} />
        <Route path="linux" element={<LinuxSetup />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
