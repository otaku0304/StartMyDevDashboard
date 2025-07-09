import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import ScriptGenerator from "../components/ScriptGenerator";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/script-generator" element={<ScriptGenerator />} />
    </Routes>
  );
};

export default AppRoutes;
