import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [showWindows, setShowWindows] = useState(false);
  const location = useLocation();

  const isWindowsRoute = location.pathname.startsWith("/docs/windows");

  return (
    <aside
      className="border-end p-3"
      style={{ width: "250px", flexShrink: 0, overflow: "auto" }}
    >
      <h5 className="fw-bold">Documentation</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/docs/getting-started" className="nav-link text-dark">
            Getting Started
          </NavLink>
        </li>

        {/* OS Dropdown: Windows */}
        <li className="nav-item">
          <p
            className={`nav-link mb-0 d-flex justify-content-between align-items-center ${
              isWindowsRoute ? "text-primary fw-semibold" : "text-dark"
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
                    `nav-link ${
                      isActive ? "text-primary fw-semibold" : "text-dark"
                    }`
                  }
                >
                  Powershell-5
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/docs/windows/ps7"
                  className={({ isActive }) =>
                    `nav-link ${
                      isActive ? "text-primary fw-semibold" : "text-dark"
                    }`
                  }
                >
                  Powershell-7
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <NavLink to="/docs/privacy-security" className="nav-link text-dark">
            Privacy & Security
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
