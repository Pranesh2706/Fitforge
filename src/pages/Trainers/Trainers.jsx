import "./Trainers.css";

import trainer1 from "../../assets/Trainer1.jpg";
import trainer2 from "../../assets/trainer2.jpg";
import trainer3 from "../../assets/trainer3.jpg";
import trainer4 from "../../assets/trainer4.jpg";

function Trainers() {
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
      {/* Hero */}
      <section className="trainers-hero">
        <div className="trainers-hero-content">
          <p className="eyebrow">MEET YOUR COACHES</p>

          <h1>
            TRAIN WITH
            <br />
            <span>THE BEST.</span>
          </h1>

          <p>
            Experienced coaches who combine proven training methods, real-world
            experience, and personalized guidance to help you become stronger.
          </p>
        </div>

        <div className="trainers-hero-stat">
          <strong>50+</strong>
          <span>EXPERT COACHES</span>
        </div>
      </section>

      {/* Trainers */}
      <section className="trainers-list">
        <div className="section-heading">
          <p className="eyebrow">OUR EXPERTS</p>

          <h2>
            Coaches who <span>push you forward.</span>
          </h2>

          <p>
            Every FITFORGE coach brings expertise, experience, and a commitment
            to helping you achieve measurable results.
          </p>
        </div>

        <div className="trainers-grid">
          {trainers.map((trainer) => (
            <article className="trainer-card" key={trainer.name}>
              <div className="trainer-image">
                <img src={trainer.image} alt={trainer.name} />

                <div className="trainer-number">
                  {String(trainers.indexOf(trainer) + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="trainer-content">
                <p className="trainer-role">{trainer.role}</p>

                <h3>{trainer.name}</h3>

                <p className="trainer-specialty">{trainer.specialty}</p>

                <span className="trainer-experience">{trainer.experience}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
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

        <button className="primary-button">Start Training</button>
      </section>
    </div>
  );
}

export default Trainers;
