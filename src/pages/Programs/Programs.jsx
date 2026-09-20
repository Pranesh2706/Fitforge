import "./Programs.css";
import Programcard from "../../components/Programcard/Programcard";
import { useNavigate } from "react-router-dom";
import workout1 from "../../assets/workout1.jpg";
import workout2 from "../../assets/workout2.jpg";
import workout3 from "../../assets/workout3.jpg";
import workout4 from "../../assets/workout4.jpg";
import workout5 from "../../assets/workout5.jpg";
import workout6 from "../../assets/workout6.jpg";
import workout7 from "../../assets/workout7.jpg";
import workout8 from "../../assets/workout8.jpg";
import workout9 from "../../assets/workout9.jpg";
import workout10 from "../../assets/workout10.jpg";
function Programs() {
  const navigate = useNavigate();
  const programs = [
    {
      id: "muscle-builder",
      number: "01",
      title: "Muscle Builder",
      image: workout1,
      description:
        "Build lean muscle, increase strength, and develop a consistent training.",
      duration: "12 Weeks",
      frequency: "5 Days / Week",
      level: "Intermediate",
      equipment: "Gym",
    },
    {
      id: "fat-loss",
      number: "02",
      title: "Fat Loss",
      image: workout2,
      description:
        "Burn calories, improve conditioning, and build sustainable fitness habits.",
      duration: "8 Weeks",
      frequency: "5 Days / Week",
      level: "Beginner",
      equipment: "Gym / Home",
    },
    {
      id: "strength-builder",
      number: "03",
      title: "Strength Builder",
      image: workout3,
      description:
        "Develop power and strength with progressive resistance training.",
      duration: "10 Weeks",
      frequency: "5 Days / Week",
      level: "Advanced",
      equipment: "Gym",
    },
    {
      id: "beginner-foundation",
      number: "04",
      title: "Beginner Foundation",
      image: workout4,
      description:
        "Learn proper movement and establish a strong fitness foundation.",
      duration: "6 Weeks",
      frequency: "4 Days / Week",
      level: "Beginner",
      equipment: "Home",
    },
    {
      id: "home-warrior",
      number: "05",
      title: "Home Warrior",
      image: workout5,
      description:
        "Get stronger from home using bodyweight and minimal equipment.",
      duration: "8 Weeks",
      frequency: "5 Days / Week",
      level: "Beginner",
      equipment: "Home",
    },
    {
      id: "performance-pro",
      number: "06",
      title: "Performance Pro",
      image: workout6,
      description:
        "Improve strength, endurance, mobility, and athletic performance.",
      duration: "12 Weeks",
      frequency: "6 Days / Week",
      level: "Advanced",
      equipment: "Gym",
    },
  ];

  return (
    <div className="programs-page">
      {/* Hero */}
      <section className="programs-hero">
        <div className="programs-hero-content">
          <div className="programs-hero-label">
            <span></span>
            TRAIN WITH PURPOSE
          </div>

          <h1>
            PROGRAMS BUILT
            <br />
            AROUND <span>YOUR GOALS.</span>
          </h1>

          <p className="programs-hero-description">
            Whether you're building muscle, losing fat, getting stronger, or
            starting your fitness journey, find a program designed specifically
            for you.
          </p>

          <div className="programs-hero-actions">
            <a href="#programs" className="primary-button">
              Find My Program
              <span>→</span>
            </a>
          </div>
        </div>

        <div className="programs-hero-stat">
          <div className="stat-line"></div>

          <div className="stat-content">
            <span className="stat-number">
              500<span>+</span>
            </span>
            <span className="stat-label">WORKOUTS</span>
          </div>

          <div className="stat-description">
            Structured training
            <br />
            for every level.
          </div>
        </div>

        <div className="hero-background-number">01</div>
      </section>
      {/* Filters */}
      <section className="program-filter">
        <button className="filter-active">All</button>
        <button>Muscle Building</button>
        <button>Fat Loss</button>
        <button>Strength</button>
        <button>Beginner</button>
        <button>Home Workout</button>
        <button>HIIT</button>
      </section>

      {/* Programs */}
      <section className="program-list">
        <div className="section-heading">
          <p className="eyebrow">EXPLORE PROGRAMS</p>

          <h2>
            Find your <span>perfect plan.</span>
          </h2>

          <p>
            Structured programs created to keep you consistent and moving toward
            measurable results.
          </p>
        </div>

        <div className="programs-grid" id="programs">
          {programs.map((program) => (
            <Programcard key={program.number} program={program} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="programs-cta">
        <p className="eyebrow">NOT SURE WHERE TO START?</p>

        <h2>
          We'll find the right
          <br />
          <span>program for you.</span>
        </h2>

        <p>
          Tell us your goal, experience, and schedule. FITFORGE will recommend a
          program that fits your lifestyle.
        </p>

        <a href="#programs" className="primary-button">
          Find My Program
          <span>→</span>
        </a>
      </section>
    </div>
  );
}

export default Programs;
