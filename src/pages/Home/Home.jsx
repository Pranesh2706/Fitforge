import { useState } from "react";
import "./Home.css";
import Button from "../../components/Buttons/Buttons";
import Programs from "../../pages/Programs/Programs";
import Trainers from "../../pages/Trainers/Trainers";
import Pricing from "../../pages/Pricing/Pricing";
// import heroImg from "../../assets/hero.png";
// import workout1 from "../../assets/workout1.jpg";
// import workout2 from "../../assets/workout2.jpg";
// import workout3 from "../../assets/workout3.jpg";
// import { useNavigate } from "react-router-dom";
import Homevideo from "../../assets/Homevideo.mp4";
function Home() {
  // const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  return (
    <div className="home">
      {/* Navbar */}

      <main>
        {/* Hero */}
        <section className="hero-section">
          <div className="hero-content">
            <p className="eyebrow">YOUR FITNESS. YOUR JOURNEY.</p>

            {/* <h1>
              BUILD YOUR
              <br />
              <span>STRONGEST</span>
              <br />
              VERSION.
            </h1> */}
            <h1>
              BUILD YOUR
              <br />
              <span style={{ color: "#b1f800" }}>STRONGEST</span>
              <br />
              VERSION.
            </h1>
            <p className="hero-description">
              Personalized workouts, expert guidance, and powerful progress
              tracking — everything you need to become stronger every day.
            </p>

            <div className="hero-actions">
              <Button variant="primary">Start Your Journey</Button>

              <Button variant="secondary" href="/programs">
                Explore Programs
              </Button>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-glow"></div>

            <video
              src={Homevideo}
              className="hero-image"
              autoPlay
              muted={isMuted}
              loop
              playsInline
            />

            <button
              className="video-sound-button"
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>

            {/* <div className="floating-card calories">
              <span>🔥</span>

              <div>
                <small>Calories</small>
                <strong>482 kcal</strong>
              </div>
            </div> */}

            {/* <div className="floating-card workout">
              <span>✓</span>

              <div>
                <small>Today's Workout</small>
                <strong>Completed</strong>
              </div>
            </div> */}
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-header">
            <span>FITFORGE BY THE NUMBERS</span>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">01</span>
              <h3>
                100K<span>+</span>
              </h3>
              <p>ACTIVE MEMBERS</p>
            </div>

            <div className="stat-item">
              <span className="stat-number">02</span>
              <h3>
                2M<span>+</span>
              </h3>
              <p>WORKOUTS COMPLETED</p>
            </div>

            <div className="stat-item">
              <span className="stat-number">03</span>
              <h3>
                500<span>+</span>
              </h3>
              <p>TRAINING PROGRAMS</p>
            </div>

            <div className="stat-item">
              <span className="stat-number">04</span>
              <h3>
                98<span>%</span>
              </h3>
              <p>MEMBER SATISFACTION</p>
            </div>
          </div>
        </section>

        <section id="programs" className="scroll-section">
          <Programs />
        </section>

        <section id="trainers" className="scroll-section">
          <Trainers />
        </section>

        <section id="pricing" className="scroll-section">
          <Pricing />
        </section>
      </main>
    </div>
  );
}

export default Home;
