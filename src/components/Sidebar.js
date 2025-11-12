import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">TaskFlow</h2>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" end>
              My Day
            </NavLink>
          </li>
          <li>
            <NavLink to="/upcoming">Upcoming</NavLink>
          </li>
          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li>
            <NavLink to="/tags">Tags</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
