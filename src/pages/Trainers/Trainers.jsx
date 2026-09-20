import "./Trainers.css";
import { useNavigate } from "react-router-dom";

import trainer1 from "../../assets/Trainer1.jpg";
import trainer2 from "../../assets/Trainer2.jpg";
import trainer3 from "../../assets/Trainer3.jpg";
import trainer4 from "../../assets/Trainer4.jpg";

function Trainers() {
  const navigate = useNavigate();

  const trainers = [
    {
      name: "Alex Carter",
      role: "STRENGTH & CONDITIONING",
      experience: "8+ YEARS EXPERIENCE",
      image: trainer1,
      specialty: "Strength Training",
    },
    {
      name: "Maya Wilson",
      role: "FITNESS & FAT LOSS",
      experience: "6+ YEARS EXPERIENCE",
      image: trainer2,
      specialty: "Fat Loss",
    },
    {
      name: "Ryan Cooper",
      role: "PERFORMANCE COACH",
      experience: "10+ YEARS EXPERIENCE",
      image: trainer3,
      specialty: "Athletic Performance",
    },
    {
      name: "Sophia Martin",
      role: "MOBILITY & FITNESS",
      experience: "7+ YEARS EXPERIENCE",
      image: trainer4,
      specialty: "Mobility",
    },
  ];

  return (
    <div className="trainers-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="trainers-hero">
        <div className="trainers-hero-left">
          <div className="trainers-hero-eyebrow">
            <span></span>
            OUR EXPERTS
          </div>

          <p className="trainers-hero-description">
            At FITFORGE, our trainers aren’t just professionals — they’re
            passionate coaches, mentors, and motivators. Each trainer brings
            unique expertise to help you achieve your fitness goals, no matter
            where you are on your journey.
          </p>

          <div className="trainers-hero-meta">
            <span>01</span>
            <div>
              <strong>PERSONALIZED COACHING</strong>
              <p>Train smarter. Move stronger.</p>
            </div>
          </div>
        </div>

        <div className="trainers-hero-right">
          <h1>
            COACHES
            <br />
            WHO
            <br />
            <span>PUSH</span>
            <br />
            <span>YOU</span>
            <br />
            <span>FORWARD.</span>
          </h1>

          <div className="trainers-hero-tagline">
            <span></span>
            <p>TRAIN. GROW. BELONG.</p>
          </div>
        </div>

        <div className="trainers-hero-number">02</div>
      </section>

      {/* =====================================================
          TRAINERS
      ===================================================== */}

      <section className="trainers-list">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MEET THE TEAM</p>

            <h2>
              TRAINERS WHO
              <br />
              <span>MAKE THE DIFFERENCE.</span>
            </h2>
          </div>

          <p>
            Every FITFORGE coach brings expertise, experience, and a commitment
            to helping you achieve measurable results.
          </p>
        </div>

        <div className="trainers-grid">
          {trainers.map((trainer, index) => (
            <article className="trainer-card" key={trainer.name}>
              {/* Image */}
              <div className="trainer-image">
                <img src={trainer.image} alt={trainer.name} />

                <div className="trainer-image-overlay"></div>

                <div className="trainer-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="trainer-view">
                  <span>VIEW COACH</span>
                  <strong>↗</strong>
                </div>
              </div>

              {/* Content */}
              <div className="trainer-content">
                <div className="trainer-top">
                  <p className="trainer-role">{trainer.role}</p>

                  <span className="trainer-status">
                    <i></i>
                    ACTIVE
                  </span>
                </div>

                <h3>{trainer.name}</h3>

                <div className="trainer-specialty-row">
                  <span>SPECIALTY</span>
                  <strong>{trainer.specialty}</strong>
                </div>

                <div className="trainer-bottom">
                  <span className="trainer-experience">
                    {trainer.experience}
                  </span>

                  <span className="trainer-arrow">↗</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="trainers-cta">
        <p className="eyebrow">READY TO GET STARTED?</p>

        <h2>
          Your goals.
          <br />
          <span>Our expertise.</span>
        </h2>

        <p>
          Get personalized guidance from coaches who understand what it takes to
          build lasting results.
        </p>

        <button
          className="primary-button"
          onClick={() => navigate("/programs")}
        >
          <span>START TRAINING</span>
          <strong>↗</strong>
        </button>
      </section>
    </div>
  );
}

export default Trainers;
