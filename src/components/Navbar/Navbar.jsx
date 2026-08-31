import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        FIT<span>FORGE</span>
      </div>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/programs">Programs</NavLink>
        <NavLink to="/trainers">Trainers</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
      </nav>

      <button className="nav-button">Start Training</button>
    </header>
  );
}

export default Navbar;
