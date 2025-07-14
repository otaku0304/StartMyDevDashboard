import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="border-end p-3" style={{ width: "250px" }}>
      <h5 className="fw-bold">📚 Documentation</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/docs/getting-started" className="nav-link text-dark">
            Getting Started
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/docs/configuration" className="nav-link text-dark">
            Configuration
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/docs/generate" className="nav-link text-dark">
            Generate Script
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/docs/spring-boot" className="nav-link text-dark">
            Spring Boot Setup
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
