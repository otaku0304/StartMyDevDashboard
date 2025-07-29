import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DocLayout = () => {
  return (
    <div className="d-flex flex-column flex-md-row" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <main className="p-4 flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DocLayout;
