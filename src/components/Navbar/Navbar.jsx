import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

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
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <button className="nav-button" onClick={() => navigate("/programs")}>
        Start Training
      </button>
    </header>
  );
}

export default Navbar;
