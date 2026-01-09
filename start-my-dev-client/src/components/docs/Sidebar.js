import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

const Sidebar = () => {
  const [showWindows, setShowWindows] = useState(false);
  const [showLinux, setShowLinux] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const isWindowsRoute = location.pathname.startsWith("/docs/windows");
  const isLinuxRoute = location.pathname.startsWith("/docs/linux");

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      {/* Toggle button for small screens */}
      <div className="d-md-none d-flex justify-content-between align-items-center p-2 border-bottom">
        <h5 className="fw-bold m-0">Docs</h5>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={toggleSidebar}
          className="ms-2"
        >
          {isSidebarOpen ? "Hide" : "Show"}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`sidebar-theme border-end p-3 d-${isSidebarOpen ? "block" : "none"} d-md-block`}
        style={{
          width: "250px",
          flexShrink: 0,
          overflow: "auto",
          height: "100%",
        }}
      >
        <h5 className="fw-bold mb-3">Documentation</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              to="/docs/getting-started"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Getting Started
            </NavLink>
          </li>

          {/* OS Dropdown: Windows */}
          <li className="nav-item">
            <p
              className={`nav-link mb-0 d-flex justify-content-between align-items-center ${isWindowsRoute ? "active fw-semibold" : ""
                }`}
              style={{ cursor: "pointer" }}
              onClick={() => setShowWindows(!showWindows)}
            >
              OS: Windows
              <span className="me-5">{showWindows ? "▾" : "▸"}</span>
            </p>

            {(showWindows || isWindowsRoute) && (
              <ul className="nav flex-column ms-3 mt-1">
                <li className="nav-item">
                  <NavLink
                    to="/docs/windows/ps5"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active fw-semibold" : ""}`
                    }
                  >
                    Powershell-5
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/docs/windows/ps7"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active fw-semibold" : ""}`
                    }
                  >
                    Powershell-7
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* OS Dropdown: Linux */}
          <li className="nav-item">
            <p
              className={`nav-link mb-0 d-flex justify-content-between align-items-center ${isLinuxRoute ? "active fw-semibold" : ""
                }`}
              style={{ cursor: "pointer" }}
              onClick={() => setShowLinux(!showLinux)}
            >
              OS: Linux
              <span className="me-5">{showLinux ? "▾" : "▸"}</span>
            </p>

            {(showLinux || isLinuxRoute) && (
              <ul className="nav flex-column ms-3 mt-1">
                <li className="nav-item">
                  <NavLink
                    to="/docs/linux"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active fw-semibold" : ""}`
                    }
                  >
                    Bash Script
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item">
            <NavLink
              to="/docs/privacy-security"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Privacy & Security
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
