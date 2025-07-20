import { NavLink } from "react-router-dom";

const Sidebar = () => {
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
