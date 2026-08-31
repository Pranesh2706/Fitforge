import { Link, useParams } from "react-router-dom";
import "./Exercisedetails.css";

const exerciseData = {
  "barbell-squat": {
    name: "Barbell Squat",
    category: "LEGS",
    description:
      "A foundational compound movement that builds lower-body strength, power, and stability.",
    equipment: "Barbell + Rack",
    difficulty: "Intermediate",
    muscles: ["Quadriceps", "Glutes", "Hamstrings", "Core"],
    sets: "5",
    reps: "5",
    rest: "180 sec",

    instructions: [
      "Stand with your feet approximately shoulder-width apart.",
      "Position the bar comfortably across your upper back.",
      "Brace your core and keep your chest lifted.",
      "Bend your knees and hips to lower your body under control.",
      "Lower until your thighs are at least parallel to the floor.",
      "Drive through your feet and return to the starting position.",
    ],

    mistakes: [
      "Allowing your knees to collapse inward.",
      "Rounding your lower back during the movement.",
      "Lifting your heels from the floor.",
      "Using more weight than you can control.",
    ],
  },
  "barbell-bench-press": {
    name: "Barbell Bench Press",
    category: "CHEST",
    description:
      "A fundamental upper-body compound exercise that develops chest strength while also training the triceps and front shoulders.",
    equipment: "Barbell + Bench",
    difficulty: "Intermediate",
    muscles: ["Chest", "Triceps", "Front Delts"],
    sets: "4",
    reps: "8-10",
    rest: "90 sec",

    instructions: [
      "Lie flat on the bench with your feet firmly planted on the floor.",
      "Position yourself so your eyes are directly underneath the bar.",
      "Grip the bar slightly wider than shoulder width.",
      "Unrack the bar and position it directly above your chest.",
      "Lower the bar slowly toward the middle of your chest.",
      "Press the bar upward while keeping your body stable.",
    ],

    mistakes: [
      "Bouncing the bar off your chest.",
      "Lifting your hips from the bench.",
      "Flaring your elbows excessively.",
      "Using a grip that is too wide or too narrow.",
      "Lowering the bar too quickly.",
    ],
  },

  "incline-dumbbell-press": {
    name: "Incline Dumbbell Press",
    category: "UPPER CHEST",
    description:
      "An upper-body pressing exercise that emphasizes the upper chest while also developing the shoulders and triceps.",
    equipment: "Dumbbells + Incline Bench",
    difficulty: "Intermediate",
    muscles: ["Upper Chest", "Front Delts", "Triceps"],
    sets: "3",
    reps: "10-12",
    rest: "75 sec",

    instructions: [
      "Set the bench to a comfortable incline position.",
      "Sit back with a dumbbell in each hand and keep your feet firmly planted.",
      "Position the dumbbells beside your upper chest.",
      "Press both dumbbells upward while keeping them controlled.",
      "Pause briefly at the top without locking your elbows aggressively.",
      "Lower the dumbbells slowly back toward your upper chest.",
    ],

    mistakes: [
      "Using too much weight and losing control.",
      "Lowering the dumbbells too quickly.",
      "Allowing the dumbbells to drift too far apart.",
      "Lifting your hips from the bench.",
    ],
  },

  "cable-fly": {
    name: "Cable Fly",
    category: "CHEST",
    description:
      "A controlled chest isolation exercise that helps develop the chest through a wide range of motion.",
    equipment: "Cable Machine",
    difficulty: "Intermediate",
    muscles: ["Chest", "Front Delts"],
    sets: "3",
    reps: "12-15",
    rest: "60 sec",

    instructions: [
      "Set the cable handles around chest height.",
      "Stand in the center of the cable machine with one foot slightly forward.",
      "Hold the handles with your palms facing forward.",
      "Keep a slight bend in your elbows throughout the movement.",
      "Bring your hands together in front of your chest in a controlled motion.",
      "Slowly return your arms to the starting position.",
    ],

    mistakes: [
      "Using momentum instead of controlled movement.",
      "Bending and extending the elbows excessively.",
      "Using too much weight.",
      "Allowing the shoulders to roll forward.",
    ],
  },

  "tricep-pushdown": {
    name: "Tricep Pushdown",
    category: "TRICEPS",
    description:
      "A popular triceps isolation exercise that builds arm strength and improves pressing performance.",
    equipment: "Cable Machine",
    difficulty: "Beginner",
    muscles: ["Triceps"],
    sets: "3",
    reps: "12-15",
    rest: "60 sec",

    instructions: [
      "Stand facing the cable machine with your feet shoulder-width apart.",
      "Grip the cable attachment with both hands.",
      "Keep your elbows close to your sides.",
      "Push the handle downward by extending your elbows.",
      "Pause briefly when your arms are fully extended.",
      "Slowly return the handle to the starting position.",
    ],

    mistakes: [
      "Moving your elbows away from your body.",
      "Using your shoulders to move the weight.",
      "Swinging your upper body.",
      "Using excessive weight and losing control.",
    ],
  },

  "dead-lift": {
    name: "Deadlift",
    category: "BACK & LEGS",
    description:
      "A powerful compound movement that develops total-body strength with an emphasis on the posterior chain.",
    equipment: "Barbell",
    difficulty: "Advanced",
    muscles: ["Hamstrings", "Glutes", "Back", "Core"],
    sets: "4",
    reps: "5",
    rest: "180 sec",

    instructions: [
      "Stand with your feet about hip-width apart.",
      "Position the bar over the middle of your feet.",
      "Hinge at your hips and grip the bar firmly.",
      "Brace your core and keep your spine neutral.",
      "Push through the floor while extending your hips.",
      "Stand tall without leaning backward at the top.",
    ],

    mistakes: [
      "Rounding your lower back.",
      "Starting with the bar too far from your body.",
      "Jerking the bar from the floor.",
      "Overextending your back at the top.",
    ],
  },
  "bodyweight-squats": {
    name: "Bodyweight Squats",
    category: "LEGS",
    description:
      "A fundamental lower-body exercise that builds strength, balance, mobility, and control using your body weight.",
    equipment: "None",
    difficulty: "Beginner",

    muscles: ["Quadriceps", "Glutes", "Hamstrings", "Core"],

    instructions: [
      "Stand with your feet about shoulder-width apart.",
      "Keep your chest up and your core engaged.",
      "Push your hips back and bend your knees to lower your body.",
      "Lower until your thighs are approximately parallel to the floor, or as far as comfortable.",
      "Keep your knees aligned with your toes.",
      "Drive through your feet to return to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],

    tips: [
      "Keep your heels firmly planted on the floor.",
      "Avoid letting your knees collapse inward.",
      "Keep your back neutral throughout the movement.",
      "Control the descent instead of dropping quickly.",
    ],

    sets: "3",
    reps: "12–15",
  },
  "push-ups": {
    name: "Push Ups",
    category: "CHEST",
    description:
      "A classic bodyweight exercise that builds upper-body strength, muscular endurance, and core stability.",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    muscles: ["Chest", "Triceps", "Front Delts", "Core"],
    sets: "3",
    reps: "10-15",
    rest: "60 sec",

    instructions: [
      "Start in a high plank position with your hands slightly wider than your shoulders.",
      "Keep your body straight from your head to your heels.",
      "Brace your core and keep your hips stable.",
      "Lower your chest toward the floor in a controlled movement.",
      "Keep your elbows at a comfortable angle from your body.",
      "Push through your hands to return to the starting position.",
    ],

    mistakes: [
      "Letting your hips drop toward the floor.",
      "Raising your hips too high.",
      "Flaring your elbows excessively.",
      "Performing the movement too quickly.",
    ],
  },

  "bench-press": {
    name: "Bench Press",
    category: "CHEST",
    description:
      "A classic upper-body compound exercise designed to build pressing strength and chest development.",
    equipment: "Barbell + Bench",
    difficulty: "Intermediate",
    muscles: ["Chest", "Triceps", "Front Delts"],
    sets: "5",
    reps: "5",
    rest: "180 sec",

    instructions: [
      "Lie flat on the bench with your feet firmly planted.",
      "Grip the bar slightly wider than shoulder width.",
      "Brace your core and keep your shoulder blades retracted.",
      "Lower the bar under control toward your chest.",
      "Keep your elbows at a comfortable angle.",
      "Press the bar upward until your arms are extended.",
    ],

    mistakes: [
      "Bouncing the bar off your chest.",
      "Lifting your hips from the bench.",
      "Using an excessively wide grip.",
      "Losing control of the bar during the descent.",
    ],
  },
};

function ExerciseDetails() {
  const { exerciseId } = useParams();

  const exercise = exerciseData[exerciseId];
  console.log("Exercise ID from URL:", exerciseId);
  console.log("Exercise found:", exercise);

  // If the exercise ID doesn't exist in exerciseData
  if (!exercise) {
    return (
      <div className="exercise-details-page">
        <div className="exercise-container">
          <Link to="/programs" className="exercise-back-link">
            ← Back to Programs
          </Link>

          <h1>Exercise Not Found</h1>

          <p>
            ID received: <strong>{exerciseId}</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="exercise-details-page">
      {/* Hero */}
      <section className="exercise-hero">
        <div className="exercise-container">
          <Link to="/programs" className="exercise-back-link">
            ← Back to Programs
          </Link>

          <div className="exercise-hero-grid">
            {/* Left */}
            <div className="exercise-hero-content">
              <p className="eyebrow">{exercise.category}</p>

              <h1>{exercise.name}</h1>

              <p className="exercise-description">{exercise.description}</p>

              <div className="exercise-tags">
                <span>{exercise.difficulty}</span>
                <span>{exercise.equipment}</span>
              </div>
            </div>

            {/* Right Visual */}
            <div className="exercise-visual">
              <div className="exercise-visual-number">01</div>

              <div className="exercise-visual-content">
                <span>EXERCISE</span>
                <strong>{exercise.name}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="exercise-main">
        <div className="exercise-container">
          {/* Stats */}
          <section className="exercise-stats-card">
            <div className="exercise-stat">
              <span>SETS</span>
              <strong>{exercise.sets}</strong>
            </div>

            <div className="exercise-stat">
              <span>REPS</span>
              <strong>{exercise.reps}</strong>
            </div>

            <div className="exercise-stat">
              <span>REST</span>
              <strong>{exercise.rest}</strong>
            </div>

            <div className="exercise-stat">
              <span>LEVEL</span>
              <strong>{exercise.difficulty}</strong>
            </div>
          </section>

          {/* Target Muscles */}
          <section className="exercise-section">
            <div className="exercise-section-heading">
              <p className="eyebrow">MUSCLE GROUPS</p>

              <h2>
                What you'll <span>target.</span>
              </h2>
            </div>

            <div className="muscle-list">
              {exercise.muscles.map((muscle, index) => (
                <div className="muscle-card" key={muscle}>
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <strong>{muscle}</strong>
                </div>
              ))}
            </div>
          </section>

          {/* Instructions */}
          <section className="exercise-section">
            <div className="exercise-section-heading">
              <p className="eyebrow">TECHNIQUE</p>

              <h2>
                How to <span>perform.</span>
              </h2>
            </div>

            <div className="instruction-list">
              {exercise.instructions.map((instruction, index) => (
                <div className="instruction-item" key={instruction}>
                  <span className="instruction-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>{instruction}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Mistakes */}
          <section className="exercise-section mistakes-section">
            <div className="exercise-section-heading">
              <p className="eyebrow">FORM CHECK</p>

              <h2>
                Avoid these <span>mistakes.</span>
              </h2>
            </div>

            <div className="mistakes-list">
              {exercise.mistakes.map((mistake, index) => (
                <div className="mistake-item" key={mistake}>
                  <span>×</span>

                  <p>{mistake}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* CTA */}
      <section className="exercise-cta">
        <p className="eyebrow">READY?</p>

        <h2>
          Add it to your <span>workout.</span>
        </h2>

        <button className="exercise-complete-button">
          Mark Exercise Complete
        </button>
      </section>
    </div>
  );
}

export default ExerciseDetails;
