import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  Dumbbell,
  Flame,
  Home,
  ShieldCheck,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import "./Programdetails.css";

/* =========================================================
   SHARED EXERCISE DATA
========================================================= */

const exercises = {
  "barbell-bench-press": {
    id: "barbell-bench-press",
    name: "Barbell Bench Press",
    sets: "4",
    reps: "8-10",
    rest: "90 sec",
  },

  "incline-dumbbell-press": {
    id: "incline-dumbbell-press",
    name: "Incline Dumbbell Press",
    sets: "3",
    reps: "10-12",
    rest: "75 sec",
  },

  "cable-fly": {
    id: "cable-fly",
    name: "Cable Fly",
    sets: "3",
    reps: "12-15",
    rest: "60 sec",
  },

  "tricep-pushdown": {
    id: "tricep-pushdown",
    name: "Tricep Pushdown",
    sets: "3",
    reps: "12-15",
    rest: "60 sec",
  },

  "lat-pulldown": {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    sets: "4",
    reps: "8-12",
    rest: "90 sec",
  },

  "barbell-row": {
    id: "barbell-row",
    name: "Barbell Row",
    sets: "4",
    reps: "8-10",
    rest: "90 sec",
  },

  "seated-cable-row": {
    id: "seated-cable-row",
    name: "Seated Cable Row",
    sets: "3",
    reps: "10-12",
    rest: "75 sec",
  },

  "dumbbell-curl": {
    id: "dumbbell-curl",
    name: "Dumbbell Curl",
    sets: "3",
    reps: "10-12",
    rest: "60 sec",
  },

  "barbell-squat": {
    id: "barbell-squat",
    name: "Barbell Squat",
    sets: "4",
    reps: "8-10",
    rest: "120 sec",
  },

  "bodyweight-squats": {
    id: "bodyweight-squats",
    name: "Bodyweight Squats",
    sets: "3",
    reps: "12-15",
    rest: "60 sec",
  },

  "leg-press": {
    id: "leg-press",
    name: "Leg Press",
    sets: "3",
    reps: "10-12",
    rest: "90 sec",
  },

  "romanian-deadlift": {
    id: "romanian-deadlift",
    name: "Romanian Deadlift",
    sets: "3",
    reps: "8-10",
    rest: "90 sec",
  },

  "leg-curl": {
    id: "leg-curl",
    name: "Leg Curl",
    sets: "3",
    reps: "12-15",
    rest: "60 sec",
  },

  "shoulder-press": {
    id: "shoulder-press",
    name: "Shoulder Press",
    sets: "4",
    reps: "8-10",
    rest: "90 sec",
  },

  "dumbbell-lateral-raise": {
    id: "dumbbell-lateral-raise",
    name: "Dumbbell Lateral Raise",
    sets: "3",
    reps: "12-15",
    rest: "60 sec",
  },

  "rear-delt-fly": {
    id: "rear-delt-fly",
    name: "Rear Delt Fly",
    sets: "3",
    reps: "12-15",
    rest: "60 sec",
  },

  "push-ups": {
    id: "push-ups",
    name: "Push Ups",
    sets: "3",
    reps: "10-15",
    rest: "45 sec",
  },

  "mountain-climbers": {
    id: "mountain-climbers",
    name: "Mountain Climbers",
    sets: "3",
    reps: "30 sec",
    rest: "45 sec",
  },

  "jumping-jacks": {
    id: "jumping-jacks",
    name: "Jumping Jacks",
    sets: "3",
    reps: "45 sec",
    rest: "30 sec",
  },

  deadlift: {
    id: "deadlift",
    name: "Deadlift",
    sets: "4",
    reps: "5",
    rest: "180 sec",
  },

  "overhead-press": {
    id: "overhead-press",
    name: "Overhead Press",
    sets: "4",
    reps: "6-8",
    rest: "120 sec",
  },

  "pull-ups": {
    id: "pull-ups",
    name: "Pull Ups",
    sets: "4",
    reps: "6-10",
    rest: "120 sec",
  },

  "walking-lunges": {
    id: "walking-lunges",
    name: "Walking Lunges",
    sets: "3",
    reps: "12 / leg",
    rest: "60 sec",
  },

  "glute-bridge": {
    id: "glute-bridge",
    name: "Glute Bridge",
    sets: "3",
    reps: "15",
    rest: "45 sec",
  },

  plank: {
    id: "plank",
    name: "Plank",
    sets: "3",
    reps: "30-60 sec",
    rest: "45 sec",
  },

  burpees: {
    id: "burpees",
    name: "Burpees",
    sets: "3",
    reps: "10-12",
    rest: "60 sec",
  },

  "high-knees": {
    id: "high-knees",
    name: "High Knees",
    sets: "3",
    reps: "30 sec",
    rest: "30 sec",
  },

  "close-grip-push-ups": {
    id: "close-grip-push-ups",
    name: "Close Grip Push Ups",
    sets: "3",
    reps: "10-15",
    rest: "45 sec",
  },

  "dumbbell-row": {
    id: "dumbbell-row",
    name: "Dumbbell Row",
    sets: "3",
    reps: "10-12",
    rest: "60 sec",
  },

  "dumbbell-goblet-squat": {
    id: "dumbbell-goblet-squat",
    name: "Dumbbell Goblet Squat",
    sets: "3",
    reps: "10-12",
    rest: "75 sec",
  },

  "dumbbell-deadlift": {
    id: "dumbbell-deadlift",
    name: "Dumbbell Deadlift",
    sets: "3",
    reps: "10-12",
    rest: "75 sec",
  },

  "box-jumps": {
    id: "box-jumps",
    name: "Box Jumps",
    sets: "4",
    reps: "6-8",
    rest: "90 sec",
  },

  "battle-rope": {
    id: "battle-rope",
    name: "Battle Rope",
    sets: "4",
    reps: "30 sec",
    rest: "60 sec",
  },

  "sprint-intervals": {
    id: "sprint-intervals",
    name: "Sprint Intervals",
    sets: "6",
    reps: "30 sec",
    rest: "60 sec",
  },

  "face-pull": {
    id: "face-pull",
    name: "Face Pull",
    sets: "3",
    reps: "12-15",
    rest: "60 sec",
  },
};

/* =========================================================
   HELPERS
========================================================= */

const exercise = (id) => exercises[id];

const workoutMeta = {
  "Chest & Triceps": { duration: 45, calories: 320 },
  "Back & Biceps": { duration: 45, calories: 380 },
  Legs: { duration: 50, calories: 410 },
  Shoulders: { duration: 40, calories: 300 },
  "Full Body": { duration: 40, calories: 350 },
  "Cardio Conditioning": { duration: 30, calories: 250 },
  "Lower Body Burn": { duration: 40, calories: 320 },
  "Full Body HIIT": { duration: 30, calories: 300 },
  "HIIT Challenge": { duration: 30, calories: 300 },
  "Power & Strength": { duration: 45, calories: 400 },
  "Upper Strength": { duration: 45, calories: 350 },
  "Lower Strength": { duration: 50, calories: 430 },
  "Pull Strength": { duration: 40, calories: 320 },
  "Heavy Lower Body": { duration: 50, calories: 450 },
  "Heavy Upper Body": { duration: 45, calories: 380 },
  "Strength Volume": { duration: 50, calories: 420 },
  "Back & Pull": { duration: 40, calories: 320 },
  "Full Body Basics": { duration: 35, calories: 250 },
  "Lower Body Basics": { duration: 35, calories: 240 },
  "Upper Body Basics": { duration: 35, calories: 220 },
  "Core & Conditioning": { duration: 30, calories: 220 },
  "Home Full Body": { duration: 35, calories: 250 },
  "Home Conditioning": { duration: 30, calories: 280 },
  "Home Lower Body": { duration: 35, calories: 250 },
  "Home Upper Body": { duration: 30, calories: 220 },
  "Explosive Power": { duration: 40, calories: 350 },
  "Upper Performance": { duration: 45, calories: 380 },
  Conditioning: { duration: 30, calories: 300 },
  "Lower Performance": { duration: 45, calories: 400 },
  "Back & Shoulders": { duration: 40, calories: 320 },
  "Athletic Conditioning": { duration: 35, calories: 330 },
};

const day = (workout, ids = []) => ({
  workout,
  duration: workoutMeta[workout]?.duration || 40,
  calories: workoutMeta[workout]?.calories || 300,
  exercises: ids.map(exercise),
});

/* =========================================================
   PROGRAM DATA
========================================================= */

const programData = {
  "muscle-builder": {
    title: "Muscle Builder",
    category: "MUSCLE BUILDING",
    description:
      "Build lean muscle, increase strength, and develop a consistent training.",
    duration: "12 Weeks",
    frequency: "5 Days / Week",
    level: "Intermediate",
    equipment: "Gym",

    weeks: {
      1: {
        Monday: day("Chest & Triceps", [
          "barbell-bench-press",
          "incline-dumbbell-press",
          "cable-fly",
          "tricep-pushdown",
        ]),

        Tuesday: day("Back & Biceps", [
          "lat-pulldown",
          "barbell-row",
          "seated-cable-row",
          "dumbbell-curl",
        ]),

        Wednesday: day("Rest & Recovery"),

        Thursday: day("Legs", [
          "barbell-squat",
          "bodyweight-squats",
          "leg-press",
          "romanian-deadlift",
          "leg-curl",
        ]),

        Friday: day("Shoulders", [
          "shoulder-press",
          "dumbbell-lateral-raise",
          "rear-delt-fly",
        ]),
      },

      2: {
        Monday: day("Chest & Triceps", [
          "barbell-bench-press",
          "incline-dumbbell-press",
          "cable-fly",
          "tricep-pushdown",
        ]),
        Tuesday: day("Back & Biceps", [
          "lat-pulldown",
          "barbell-row",
          "seated-cable-row",
          "dumbbell-curl",
        ]),
        Wednesday: day("Rest & Recovery"),
        Thursday: day("Legs", [
          "barbell-squat",
          "leg-press",
          "romanian-deadlift",
          "leg-curl",
        ]),
        Friday: day("Shoulders", [
          "shoulder-press",
          "dumbbell-lateral-raise",
          "rear-delt-fly",
        ]),
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
        Monday: day("Full Body", [
          "bodyweight-squats",
          "push-ups",
          "mountain-climbers",
          "jumping-jacks",
        ]),
        Tuesday: day("Cardio Conditioning", [
          "high-knees",
          "mountain-climbers",
          "burpees",
          "jumping-jacks",
        ]),
        Wednesday: day("Rest & Recovery"),
        Thursday: day("Lower Body Burn", [
          "bodyweight-squats",
          "walking-lunges",
          "glute-bridge",
          "high-knees",
        ]),
        Friday: day("Full Body HIIT", [
          "burpees",
          "mountain-climbers",
          "high-knees",
          "jumping-jacks",
        ]),
      },

      2: {
        Monday: day("Full Body", [
          "bodyweight-squats",
          "push-ups",
          "mountain-climbers",
          "burpees",
        ]),
        Tuesday: day("Cardio Conditioning", [
          "high-knees",
          "jumping-jacks",
          "mountain-climbers",
        ]),
        Wednesday: day("Rest & Recovery"),
        Thursday: day("Lower Body Burn", [
          "walking-lunges",
          "bodyweight-squats",
          "glute-bridge",
        ]),
        Friday: day("HIIT Challenge", [
          "burpees",
          "high-knees",
          "mountain-climbers",
          "jumping-jacks",
        ]),
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
        Monday: day("Power & Strength", [
          "barbell-squat",
          "deadlift",
          "barbell-bench-press",
        ]),
        Tuesday: day("Upper Strength", [
          "barbell-bench-press",
          "barbell-row",
          "overhead-press",
        ]),
        Wednesday: day("Rest & Recovery"),
        Thursday: day("Lower Strength", [
          "barbell-squat",
          "deadlift",
          "walking-lunges",
        ]),
        Friday: day("Pull Strength", [
          "pull-ups",
          "barbell-row",
          "dumbbell-curl",
        ]),
      },

      2: {
        Monday: day("Heavy Lower Body", [
          "barbell-squat",
          "deadlift",
          "walking-lunges",
        ]),
        Tuesday: day("Heavy Upper Body", [
          "barbell-bench-press",
          "barbell-row",
          "overhead-press",
        ]),
        Wednesday: day("Rest & Recovery"),
        Thursday: day("Strength Volume", [
          "barbell-squat",
          "barbell-bench-press",
          "deadlift",
        ]),
        Friday: day("Back & Pull", [
          "pull-ups",
          "barbell-row",
          "dumbbell-curl",
        ]),
      },
    },
  },

  "beginner-foundation": {
    title: "Beginner Foundation",
    category: "BEGINNER",
    description:
      "Learn proper movement, build confidence, and establish a strong fitness foundation.",
    duration: "6 Weeks",
    frequency: "4 Days / Week",
    level: "Beginner",
    equipment: "Home",

    weeks: {
      1: {
        Monday: day("Full Body Basics", [
          "bodyweight-squats",
          "push-ups",
          "glute-bridge",
          "plank",
        ]),
        Tuesday: day("Lower Body Basics", [
          "bodyweight-squats",
          "walking-lunges",
          "glute-bridge",
        ]),
        Wednesday: day("Rest & Recovery"),
        Thursday: day("Upper Body Basics", [
          "push-ups",
          "close-grip-push-ups",
          "plank",
        ]),
        Friday: day("Core & Conditioning", [
          "plank",
          "mountain-climbers",
          "high-knees",
        ]),
      },
    },
  },

  "home-warrior": {
    title: "Home Warrior",
    category: "HOME WORKOUT",
    description:
      "Get stronger from home using bodyweight and minimal equipment.",
    duration: "8 Weeks",
    frequency: "5 Days / Week",
    level: "Beginner",
    equipment: "Home",

    weeks: {
      1: {
        Monday: day("Home Full Body", [
          "bodyweight-squats",
          "push-ups",
          "glute-bridge",
          "plank",
        ]),
        Tuesday: day("Home Conditioning", [
          "jumping-jacks",
          "high-knees",
          "mountain-climbers",
          "burpees",
        ]),
        Wednesday: day("Rest & Recovery"),
        Thursday: day("Home Lower Body", [
          "bodyweight-squats",
          "walking-lunges",
          "glute-bridge",
        ]),
        Friday: day("Home Upper Body", [
          "push-ups",
          "close-grip-push-ups",
          "plank",
        ]),
      },
    },
  },

  "performance-pro": {
    title: "Performance Pro",
    category: "PERFORMANCE",
    description:
      "Improve strength, endurance, mobility, and athletic performance.",
    duration: "12 Weeks",
    frequency: "6 Days / Week",
    level: "Advanced",
    equipment: "Gym",

    weeks: {
      1: {
        Monday: day("Explosive Power", [
          "box-jumps",
          "barbell-squat",
          "sprint-intervals",
        ]),
        Tuesday: day("Upper Performance", [
          "barbell-bench-press",
          "pull-ups",
          "overhead-press",
        ]),
        Wednesday: day("Conditioning", [
          "battle-rope",
          "burpees",
          "sprint-intervals",
        ]),
        Thursday: day("Lower Performance", [
          "deadlift",
          "walking-lunges",
          "box-jumps",
        ]),
        Friday: day("Back & Shoulders", [
          "pull-ups",
          "face-pull",
          "overhead-press",
        ]),
        Saturday: day("Athletic Conditioning", [
          "battle-rope",
          "high-knees",
          "sprint-intervals",
        ]),
      },
    },
  },
};

/* =========================================================
   PROGRAM DETAILS
========================================================= */

function ProgramDetails() {
  const { programId } = useParams();
  const navigate = useNavigate();

  const program = programData[programId];

  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completedWorkout, setCompletedWorkout] = useState(false);
  const [completionMessage, setCompletionMessage] = useState("");

  /*
    Reset the selected day whenever the selected week/program changes.
  */
  useEffect(() => {
    if (!program) return;

    const availableDays = Object.keys(program.weeks?.[selectedWeek] || {});

    setSelectedDay(availableDays[0] || null);
    setCompletedWorkout(false);
    setCompletionMessage("");
  }, [programId, selectedWeek, program]);

  /*
    Invalid program:
    Do NOT silently show Muscle Builder.
  */
  if (!program) {
    return (
      <main className="program-details-page">
        <section className="program-details-container program-not-found">
          <span className="eyebrow">FITFORGE PROGRAMS</span>

          <h1>PROGRAM NOT FOUND</h1>

          <p>
            The program you're looking for doesn't exist or is no longer
            available.
          </p>

          <Link to="/programs" className="primary-button">
            <ChevronLeft size={18} />
            Back to Programs
          </Link>
        </section>
      </main>
    );
  }

  const availableWeeks = Object.keys(program.weeks || {}).map(Number);

  const week = program.weeks?.[selectedWeek];

  const days = Object.keys(week || {});

  const dayData = selectedDay ? week?.[selectedDay] : null;

  const totalExercises = useMemo(() => {
    return Object.values(program.weeks || {}).reduce((total, weekData) => {
      return (
        total +
        Object.values(weekData || {}).reduce((weekTotal, dayData) => {
          return weekTotal + (dayData?.exercises?.length || 0);
        }, 0)
      );
    }, 0);
  }, [program]);

  const handleCompleteWorkout = async () => {
    if (
      !dayData ||
      dayData.exercises.length === 0 ||
      isCompleting ||
      completedWorkout
    ) {
      return;
    }

    try {
      setIsCompleting(true);
      setCompletionMessage("");

      const token = localStorage.getItem("fitforge_token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/workout-progress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            workoutName: dayData.workout,
            duration: dayData.duration,
            calories: dayData.calories,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to complete workout");
      }

      setCompletedWorkout(true);
      setCompletionMessage("Workout completed successfully!");
    } catch (error) {
      console.error("Workout completion error:", error);
      setCompletionMessage(error.message || "Unable to complete workout");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="program-details-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="program-details-hero">
        <div className="program-details-container">
          <Link to="/programs" className="back-link">
            <ChevronLeft size={16} />
            Back to Programs
          </Link>

          <div className="program-details-hero-content">
            <div className="program-details-heading">
              <p className="eyebrow">{program.category}</p>

              <h1>{program.title}</h1>

              <p className="program-details-description">
                {program.description}
              </p>

              <div className="program-hero-highlights">
                <div>
                  <Dumbbell size={17} />
                  <span>{totalExercises}+ Exercises</span>
                </div>

                <div>
                  <Trophy size={17} />
                  <span>{program.level}</span>
                </div>

                <div>
                  <Zap size={17} />
                  <span>Structured Training</span>
                </div>
              </div>
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

      {/* =====================================================
          TRAINING PLAN
      ===================================================== */}

      <main className="program-workout">
        <div className="program-details-container">
          {/* WEEK SELECTOR */}

          <section className="week-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">YOUR TRAINING PLAN</p>

                <h2>
                  Choose your <span>week.</span>
                </h2>
              </div>

              <span className="plan-counter">
                {availableWeeks.length} AVAILABLE
              </span>
            </div>

            <div className="week-selector">
              {availableWeeks.map((weekNumber) => (
                <button
                  key={weekNumber}
                  type="button"
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

          {/* =================================================
              DAY SELECTOR
          ================================================= */}

          <section className="workout-section">
            <div className="day-selector">
              {days.map((dayName) => (
                <button
                  key={dayName}
                  type="button"
                  className={
                    selectedDay === dayName ? "day-button active" : "day-button"
                  }
                  onClick={() => setSelectedDay(dayName)}
                >
                  {dayName}
                </button>
              ))}
            </div>

            {/* =================================================
                WORKOUT HEADER
            ================================================= */}

            {dayData && (
              <div className="workout-heading">
                <div>
                  <p className="eyebrow">
                    WEEK {String(selectedWeek).padStart(2, "0")}
                  </p>

                  <h2>{dayData.workout}</h2>
                </div>

                {dayData.exercises.length > 0 && (
                  <div className="workout-heading-actions">
                    <span className="exercise-count">
                      {dayData.exercises.length} EXERCISES
                    </span>

                    <button
                      type="button"
                      className={
                        completedWorkout
                          ? "complete-workout-button completed"
                          : "complete-workout-button"
                      }
                      onClick={handleCompleteWorkout}
                      disabled={isCompleting || completedWorkout}
                    >
                      {isCompleting
                        ? "SAVING..."
                        : completedWorkout
                          ? "✓ COMPLETED"
                          : "COMPLETE WORKOUT"}
                    </button>
                  </div>
                )}

                {completionMessage && (
                  <p
                    className={
                      completedWorkout
                        ? "workout-completion-message success"
                        : "workout-completion-message error"
                    }
                  >
                    {completionMessage}
                  </p>
                )}
              </div>
            )}

            {/* =================================================
                REST DAY
            ================================================= */}

            {dayData && dayData.exercises.length === 0 && (
              <div className="rest-day">
                <span>RECOVERY DAY</span>

                <h3>Rest & Recover</h3>

                <p>
                  Give your body time to recover and prepare for your next
                  training session.
                </p>
              </div>
            )}

            {/* =================================================
                EXERCISES
            ================================================= */}

            {dayData?.exercises?.length > 0 && (
              <div className="exercise-list">
                {dayData.exercises.map((item, index) => (
                  <article
                    className="exercise-card"
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/exercises/${item.id}`)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        navigate(`/exercises/${item.id}`);
                      }
                    }}
                  >
                    <div className="exercise-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="exercise-info">
                      <div className="exercise-title-row">
                        <h3>{item.name}</h3>

                        <span className="exercise-view">VIEW EXERCISE</span>
                      </div>

                      <div className="exercise-stats">
                        <div>
                          <span>SETS</span>
                          <strong>{item.sets}</strong>
                        </div>

                        <div>
                          <span>REPS</span>
                          <strong>{item.reps}</strong>
                        </div>

                        <div>
                          <span>REST</span>
                          <strong>{item.rest}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="exercise-arrow"
                      aria-label={`View ${item.name}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/exercises/${item.id}`);
                      }}
                    >
                      <ArrowRight size={18} />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* =================================================
              PROGRAM BENEFITS
          ================================================= */}

          <section className="program-benefits">
            <div className="benefit-card">
              <div className="benefit-icon">
                <ShieldCheck size={20} />
              </div>

              <div>
                <span>STRUCTURED</span>
                <h3>Progressive Training</h3>
                <p>
                  Follow a clear training structure designed around your goal.
                </p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Timer size={20} />
              </div>

              <div>
                <span>CONSISTENCY</span>
                <h3>Stay On Track</h3>
                <p>
                  Build a repeatable routine and keep your training momentum.
                </p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Flame size={20} />
              </div>

              <div>
                <span>PERFORMANCE</span>
                <h3>Track Your Progress</h3>
                <p>Completed workouts are saved to your FitForge progress.</p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Home size={20} />
              </div>

              <div>
                <span>EQUIPMENT</span>
                <h3>{program.equipment}</h3>
                <p>Train with the equipment required by this program.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="program-details-cta">
        <p className="eyebrow">READY TO START?</p>

        <h2>
          Build your <span>strongest version.</span>
        </h2>

        <p>
          Pick your training day, complete your workout, and keep building
          momentum with FITFORGE.
        </p>

        <button
          type="button"
          className="primary-button"
          onClick={() => {
            const firstDay = Object.keys(
              program.weeks?.[selectedWeek] || {},
            )[0];

            if (firstDay) {
              setSelectedDay(firstDay);
              window.scrollTo({
                top: document.querySelector(".workout-section")?.offsetTop
                  ? document.querySelector(".workout-section").offsetTop - 100
                  : 0,
                behavior: "smooth",
              });
            }
          }}
        >
          Start This Program
          <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}

export default ProgramDetails;
