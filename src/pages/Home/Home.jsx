import { useNavigate } from "react-router-dom";
import "./Home.css";

import Contact from "../../components/Contact/Contact";
import Button from "../../components/Buttons/Buttons";
import Programs from "../../pages/Programs/Programs";
import Trainers from "../../pages/Trainers/Trainers";
import Pricing from "../../pages/Pricing/Pricing";

import heroImage from "../../assets/hero.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <main>
        {/* ================= HERO ================= */}
        <section className="hero-section">
          {/* LEFT CONTENT */}
          <div className="hero-content">
            <div className="hero-mini-title">
              <span></span>
              STRONGER EVERY DAY
              <i></i>
            </div>

            <h1>
              DISCIPLINE
              <br />
              BUILDS <span>FREEDOM.</span>
            </h1>

            <p className="hero-description">
              Personalized workouts. Expert trainers. Real progress.
              <br />
              Join FitForge and become the strongest version of yourself.
            </p>

            <div className="hero-actions">
              {localStorage.getItem("fitforge_token") ? (
                <Button
                  variant="primary"
                  onClick={() => navigate("/dashboard")}
                >
                  GO TO DASHBOARD →
                </Button>
              ) : (
                <Button variant="primary" onClick={() => navigate("/programs")}>
                  EXPLORE PROGRAMS →
                </Button>
              )}
            </div>

            {/* STATS */}
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>01</strong>
                <div>
                  <b>Workout</b>
                  <small>Programs</small>
                </div>
              </div>

              <div className="hero-stat">
                <strong>02</strong>
                <div>
                  <b>Real</b>
                  <small>Progress Tracking</small>
                </div>
              </div>

              <div className="hero-stat">
                <strong>03</strong>
                <div>
                  <b>Personal</b>
                  <small>Fitness Dashboard</small>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hero-visual">
            <img
              src={heroImage}
              alt="FitForge athlete training"
              className="hero-image"
            />

            <div className="hero-image-overlay"></div>

            {/* IMAGE TEXT */}
            <div className="hero-image-brand">
              <strong>FITFORGE</strong>
              <span>STRONGER EVERY DAY</span>
            </div>

            {/* PROGRESS CARD */}
            <div className="progress-card">
              <div className="progress-card-top">
                <div>
                  <span>YOUR PROGRESS</span>
                  <strong>
                    SMALL STEPS
                    <br />
                    BIG CHANGES
                  </strong>
                </div>

                <b>↑</b>
              </div>

              <div className="progress-chart">
                <span style={{ height: "22%" }}></span>
                <span style={{ height: "38%" }}></span>
                <span style={{ height: "32%" }}></span>
                <span style={{ height: "48%" }}></span>
                <span style={{ height: "43%" }}></span>
                <span style={{ height: "67%" }}></span>
                <span style={{ height: "82%" }}></span>
              </div>

              <div className="chart-days">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
            </div>

            {/* MOTIVATION */}
            <div className="image-quote">
              <p>
                “A stronger you,
                <br />a brighter tomorrow.”
              </p>

              <span></span>
            </div>
          </div>
        </section>

        {/* ================= FEATURE CARDS ================= */}
        <section className="feature-strip">
          <div className="feature-box">
            <div className="feature-icon">♢</div>

            <div>
              <h3>Personalized Workout Plans</h3>
              <p>Programs for every fitness level</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon">◉</div>

            <div>
              <h3>Nutrition Guidance</h3>
              <p>Fuel your progress</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon">↗</div>

            <div>
              <h3>Track Your Progress</h3>
              <p>See your real results</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon">♧</div>

            <div>
              <h3>Supportive Community</h3>
              <p>You're not alone</p>
            </div>
          </div>
        </section>

        {/* ================= BRAND STATEMENT ================= */}
        <section className="brand-section">
          <div className="brand-watermark">FITNESS</div>

          <div className="brand-content">
            <div className="brand-line">
              <span>MORE THAN A WORKOUT</span>
              <i></i>
              <span>A BETTER YOU</span>
            </div>

            <div className="brand-values">
              <span>FITNESS</span>
              <b>•</b>

              <span>DISCIPLINE</span>
              <b>•</b>

              <span>CONSISTENCY</span>
              <b>•</b>

              <span>PROGRESS</span>
              <b>•</b>

              <span>CONFIDENCE</span>
              <b>•</b>

              <span>HEALTH</span>
              <b>•</b>

              <span>HAPPINESS</span>
            </div>
          </div>
        </section>

        {/* ================= PROGRAMS ================= */}
        <section id="programs" className="scroll-section">
          <Programs />
        </section>

        {/* ================= TRAINERS ================= */}
        <section id="trainers" className="scroll-section">
          <Trainers />
        </section>

        {/* ================= PRICING ================= */}
        <section id="pricing" className="scroll-section">
          <Pricing />
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="scroll-section">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default Home;
