import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Programdetails.css";

const programData = {
  "muscle-builder": {
    title: "Muscle Builder",
    category: "MUSCLE BUILDING",
    description:
      "Build lean muscle, increase strength, and develop a consistent training routine with progressive workouts.",
    duration: "12 Weeks",
    frequency: "5 Days / Week",
    level: "Intermediate",
    equipment: "Gym",
    weeks: {
      1: {
        Monday: {
          workout: "Chest & Triceps",
          exercises: [
            {
              id: "barbell-bench-press",
              name: "Barbell Bench Press",
              sets: "4",
              reps: "8-10",
              rest: "90 sec",
            },
            {
              id: "incline-dumbell-press",
              name: "Incline Dumbbell Press",
              sets: "3",
              reps: "10-12",
              rest: "75 sec",
            },
            {
              id: "cable-fly",
              name: "Cable Fly",
              sets: "3",
              reps: "12-15",
              rest: "60 sec",
            },
            {
              id: "tricep-pushdown",
              name: "Tricep Pushdown",
              sets: "3",
              reps: "12-15",
              rest: "60 sec",
            },
          ],
        },

        Tuesday: {
          workout: "Back & Biceps",
          exercises: [
            {
              id: "lat-pulldown",
              name: "Lat Pulldown",
              sets: "4",
              reps: "8-12",
              rest: "90 sec",
            },
            {
              id: "barbell-row",
              name: "Barbell Row",
              sets: "4",
              reps: "8-10",
              rest: "90 sec",
            },
            {
              id: "seated-cable-row",
              name: "Seated Cable Row",
              sets: "3",
              reps: "10-12",
              rest: "75 sec",
            },
            {
              id: "dumbell-curl",
              name: "Dumbbell Curl",
              sets: "3",
              reps: "10-12",
              rest: "60 sec",
            },
          ],
        },

        Wednesday: {
          workout: "Rest & Recovery",
          exercises: [],
        },

        Thursday: {
          workout: "Legs",
          exercises: [
            {
              id: "barbell-squat",
              name: "Barbell Squat",
              sets: "4",
              reps: "8-10",
              rest: "120 sec",
            },
            {
              id: "bodyweight-squats",
              name: "Bodyweight Squats",
              sets: "3",
              reps: "12-15",
              rest: "60 sec",
            },
            {
              id: "leg-press",
              name: "Leg Press",
              sets: "3",
              reps: "10-12",
              rest: "90 sec",
            },
            {
              id: "romanian-deadlift",
              name: "Romanian Deadlift",
              sets: "3",
              reps: "8-10",
              rest: "90 sec",
            },
            {
              id: "leg-curl",
              name: "Leg Curl",
              sets: "3",
              reps: "12-15",
              rest: "60 sec",
            },
          ],
        },

        Friday: {
          workout: "Shoulders",
          exercises: [
            {
              id: "shoulder-press",
              name: "Shoulder Press",
              sets: "4",
              reps: "8-10",
              rest: "90 sec",
            },
            {
              id: "dumbbell-lateral-raise",
              name: "Dumbbell Lateral Raise",
              sets: "3",
              reps: "12-15",
              rest: "60 sec",
            },
            {
              id: "rear-delt-fly",
              name: "Rear Delt Fly",
              sets: "3",
              reps: "12-15",
              rest: "60 sec",
            },
          ],
        },
      },
    },
  },

  "fat-loss": {
    title: "Fat Loss",
    category: "FAT LOSS",
    description:
      "Burn calories, improve conditioning, and build sustainable fitness habits with a balanced training plan.",
    duration: "8 Weeks",
    frequency: "5 Days / Week",
    level: "Beginner",
    equipment: "Gym / Home",
    weeks: {
      1: {
        Monday: {
          workout: "Full Body",
          exercises: [
            {
              id: "bodyweight-squats",
              name: "Bodyweight Squats",
              sets: "3",
              reps: "15",
              rest: "45 sec",
            },
            {
              id: "push-ups",
              name: "Push Ups",
              sets: "3",
              reps: "10-15",
              rest: "45 sec",
            },
            {
              id: "mountain-climbers",
              name: "Mountain Climbers",
              sets: "3",
              reps: "30 sec",
              rest: "45 sec",
            },
            {
              id: "jumping-jacks",
              name: "Jumping Jacks",
              sets: "3",
              reps: "45 sec",
              rest: "30 sec",
            },
          ],
        },
      },
    },
  },

  "strength-builder": {
    title: "Strength Builder",
    category: "STRENGTH",
    description:
      "Develop power and strength through progressive resistance training and compound movements.",
    duration: "10 Weeks",
    frequency: "5 Days / Week",
    level: "Advanced",
    equipment: "Gym",
    weeks: {
      1: {
        Monday: {
          workout: "Power & Strength",
          exercises: [
            {
              id: "barbell-squat",
              name: "Barbell Squat",
              sets: "5",
              reps: "5",
              rest: "180 sec",
            },
            {
              id: "dead-lift",
              name: "Deadlift",
              sets: "4",
              reps: "5",
              rest: "180 sec",
            },
            {
              id: "bench-press",
              name: "Bench Press",
              sets: "5",
              reps: "5",
              rest: "180 sec",
            },
          ],
        },
      },
    },
  },
};

function ProgramDetails() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const program = programData[programId] || programData["muscle-builder"];

  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState("Monday");

  const week = program.weeks[selectedWeek];

  const dayData = week?.[selectedDay] || Object.values(week || {})[0];

  const days = Object.keys(week || {});

  return (
    <div className="program-details-page">
      {/* Hero */}
      <section className="program-details-hero">
        <div className="program-details-container">
          <Link to="/programs" className="back-link">
            ← Back to Programs
          </Link>

          <div className="program-details-hero-content">
            <div className="program-details-heading">
              <p className="eyebrow">{program.category}</p>

              <h1>{program.title}</h1>

              <p className="program-details-description">
                {program.description}
              </p>
            </div>

            <div className="program-details-meta">
              <div className="meta-item">
                <span>01</span>
                <small>DURATION</small>
                <strong>{program.duration}</strong>
              </div>

              <div className="meta-item">
                <span>02</span>
                <small>FREQUENCY</small>
                <strong>{program.frequency}</strong>
              </div>

              <div className="meta-item">
                <span>03</span>
                <small>LEVEL</small>
                <strong>{program.level}</strong>
              </div>

              <div className="meta-item">
                <span>04</span>
                <small>EQUIPMENT</small>
                <strong>{program.equipment}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workout */}
      <main className="program-workout">
        <div className="program-details-container">
          {/* Week Selector */}
          <section className="week-section">
            <div className="section-heading">
              <p className="eyebrow">YOUR TRAINING PLAN</p>

              <h2>
                Choose your <span>week.</span>
              </h2>
            </div>

            <div className="week-selector">
              {[1, 2, 3, 4, 5, 6].map((weekNumber) => (
                <button
                  key={weekNumber}
                  className={
                    selectedWeek === weekNumber
                      ? "week-button active"
                      : "week-button"
                  }
                  onClick={() => setSelectedWeek(weekNumber)}
                >
                  <small>WEEK</small>
                  <strong>{String(weekNumber).padStart(2, "0")}</strong>
                </button>
              ))}
            </div>
          </section>

          {/* Day Selector */}
          <section className="workout-section">
            <div className="day-selector">
              {days.map((day) => (
                <button
                  key={day}
                  className={
                    selectedDay === day ? "day-button active" : "day-button"
                  }
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Workout Heading */}
            {dayData && (
              <div className="workout-heading">
                <div>
                  <p className="eyebrow">
                    WEEK {String(selectedWeek).padStart(2, "0")}
                  </p>

                  <h2>{dayData.workout}</h2>
                </div>

                {dayData.exercises.length > 0 && (
                  <span className="exercise-count">
                    {dayData.exercises.length} EXERCISES
                  </span>
                )}
              </div>
            )}

            {/* Exercises */}
            {dayData?.exercises?.length > 0 ? (
              <div className="exercise-list">
                {dayData.exercises.map((exercise, index) => (
                  <article
                    className="exercise-card"
                    key={exercise.id}
                    onClick={() => navigate(`/exercises/${exercise.id}`)}
                  >
                    <div className="exercise-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="exercise-info">
                      <h3>{exercise.name}</h3>

                      <div className="exercise-stats">
                        <div>
                          <span>SETS</span>
                          <strong>{exercise.sets}</strong>
                        </div>

                        <div>
                          <span>REPS</span>
                          <strong>{exercise.reps}</strong>
                        </div>

                        <div>
                          <span>REST</span>
                          <strong>{exercise.rest}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      className="exercise-arrow"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/exercises/${exercise.id}`);
                      }}
                    >
                      ↗
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rest-day">
                <span>RECOVERY DAY</span>

                <h3>Rest & Recover</h3>

                <p>
                  Give your body time to recover and prepare for your next
                  training session.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="program-details-cta">
        <p className="eyebrow">READY TO START?</p>

        <h2>
          Build your <span>strongest version.</span>
        </h2>

        <button className="primary-button">Start This Program</button>
      </section>
    </div>
  );
}

export default ProgramDetails;
