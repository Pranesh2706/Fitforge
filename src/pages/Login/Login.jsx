import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Dumbbell } from "lucide-react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("fitforge_token", data.token);
      localStorage.setItem("fitforge_user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("fitforge-auth-change"));

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      {/* Background decoration */}
      <div className="login-grid"></div>
      <div className="login-glow login-glow-one"></div>
      <div className="login-glow login-glow-two"></div>

      <section className="login-container">
        {/* ================= LEFT PANEL ================= */}

        <div className="login-showcase">
          <div className="showcase-brand">
            <Dumbbell size={22} strokeWidth={2.5} />
            <span>FITFORGE</span>
          </div>

          <div className="showcase-content">
            <span className="showcase-label">YOUR FITNESS. YOUR RULES.</span>

            <h1>
              BUILD THE
              <br />
              <span>STRONGER</span>
              <br />
              YOU.
            </h1>

            <p>
              Train smarter. Track your progress. Build a body and mindset that
              lasts.
            </p>

            <div className="showcase-stats">
              <div>
                <strong>12K+</strong>
                <span>Members</span>
              </div>

              <div>
                <strong>50+</strong>
                <span>Programs</span>
              </div>

              <div>
                <strong>4.9</strong>
                <span>Rating</span>
              </div>
            </div>
          </div>

          <div className="showcase-footer">
            <span>© 2026 FitForge</span>
            <span>Train Different.</span>
          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div className="login-form-wrapper">
          <div className="login-form-header">
            <span className="mobile-brand">FITFORGE</span>

            <h2>Welcome back.</h2>

            <p>Sign in to continue your fitness journey.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* EMAIL */}

            <div className="input-field">
              <label>Email address</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="input-field">
              <div className="password-label">
                <label>Password</label>

                <button type="button" className="forgot-btn" onClick={() => {}}>
                  Forgot password?
                </button>
              </div>

              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* REMEMBER */}

            <label className="remember-row">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            {/* ERROR */}

            {error && <div className="login-error">{error}</div>}

            {/* SUBMIT */}

            <button className="login-submit" type="submit" disabled={loading}>
              <span>{loading ? "SIGNING IN..." : "SIGN IN"}</span>

              {!loading && <ArrowRight size={19} />}
            </button>
          </form>

          {/* SIGN UP */}

          <div className="signup-prompt">
            <span>New to FitForge?</span>

            <button onClick={() => navigate("/signup")}>
              Create an account
            </button>
          </div>

          <div className="secure-note">
            <span className="secure-dot"></span>
            Secure & encrypted authentication
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
