import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("fitforge_token"),
  );

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("fitforge_user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [logoutMessage, setLogoutMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem("fitforge_token");
      const savedUser = localStorage.getItem("fitforge_user");

      setIsLoggedIn(!!token);
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener("fitforge-auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("fitforge-auth-change", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fitforge_token");
    localStorage.removeItem("fitforge_user");

    setIsLoggedIn(false);
    setUser(null);
    setMenuOpen(false);

    setLogoutMessage("Logged out successfully");

    navigate("/");

    setTimeout(() => {
      setLogoutMessage("");
    }, 3000);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleStartTraining = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* Logout Message */}
      {logoutMessage && (
        <div className="logout-message">
          <span>✓</span>
          {logoutMessage}
        </div>
      )}

      <header className="navbar">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          FIT<span>FORGE</span>
        </div>

        {/* Navigation */}
        <nav className={menuOpen ? "mobile-open" : ""}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/programs" onClick={closeMenu}>
            Programs
          </NavLink>

          <NavLink to="/trainers" onClick={closeMenu}>
            Trainers
          </NavLink>

          <NavLink to="/pricing" onClick={closeMenu}>
            Pricing
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>

          {/* Mobile User Area */}
          <div className="mobile-user-area">
            {isLoggedIn ? (
              <>
                <span className="nav-user-name">
                  Hi,{" "}
                  {user?.name
                    ? user.name
                        .toLowerCase()
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")
                    : "User"}
                </span>

                <button className="nav-button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button className="nav-button" onClick={handleStartTraining}>
                Start Training
              </button>
            )}
          </div>
        </nav>

        {/* Desktop User Area */}
        <div className="desktop-user-area">
          {isLoggedIn ? (
            <div className="nav-user-area">
              <span className="nav-user-name">
                Hi,{" "}
                {user?.name
                  ? user.name
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")
                  : "User"}
              </span>

              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="nav-button" onClick={handleStartTraining}>
              Start Training
            </button>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
    </>
  );
}

export default Navbar;
