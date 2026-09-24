import "./Footer.css";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer className="footer">
      {/* Top CTA */}
      <div className="footer-cta">
        <div>
          <p className="footer-eyebrow">YOUR STRONGEST VERSION STARTS HERE.</p>

          <h2>
            READY TO
            <br />
            <span>FORGE YOURSELF?</span>
          </h2>
        </div>

        <button
          className="footer-cta-button"
          onClick={() => scrollToSection("pricing")}
        >
          START TRAINING
          <span>↗</span>
        </button>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            FIT<span>FORGE</span>
          </div>

          <p>
            Train smarter. Get stronger. Become the best version of yourself.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>

            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-column">
          <h4>EXPLORE</h4>

          <button onClick={() => scrollToSection("home")}>Home</button>

          <button onClick={() => scrollToSection("programs")}>Programs</button>

          <button onClick={() => scrollToSection("trainers")}>Trainers</button>

          <button onClick={() => scrollToSection("pricing")}>Pricing</button>

          <button onClick={() => scrollToSection("contact")}>Contact</button>
        </div>

        {/* Training */}
        <div className="footer-column">
          <h4>TRAINING</h4>

          <button onClick={() => scrollToSection("programs")}>
            Muscle Building
          </button>

          <button onClick={() => scrollToSection("programs")}>Fat Loss</button>

          <button onClick={() => scrollToSection("programs")}>Strength</button>

          <button onClick={() => scrollToSection("programs")}>
            Home Workouts
          </button>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h4>GET IN TOUCH</h4>

          <a href="mailto:hello@fitforge.com">hello@fitforge.com</a>

          <a href="tel:+918056451650">+91 8056451650</a>

          <p>
            Chennai, Tamil Nadu
            <br />
            India
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 FITFORGE. ALL RIGHTS RESERVED.</p>

        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>

        <p className="footer-made">
          BUILT FOR <span>PROGRESS.</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
