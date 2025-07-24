import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [showWindows, setShowWindows] = useState(false);

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
            className="nav-link text-dark mb-0 d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer"}}
            onClick={() => setShowWindows(!showWindows)}
          >
            OS: Windows
            <span className="me-5">{showWindows ? "▾" : "▸"}</span>
          </p>

          {showWindows && (
            <ul className="nav flex-column ms-3 mt-1">
              <li className="nav-item">
                <NavLink to="/docs/windows/ps5" className="nav-link text-dark">
                  PS5
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/docs/windows/ps7" className="nav-link text-dark">
                  PS7
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Privacy & Security */}
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
