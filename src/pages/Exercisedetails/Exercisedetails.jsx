import { Link, useParams } from "react-router-dom";
import "./Exercisedetails.css";

const exerciseData = {
  // =====================================================
  // CHEST
  // =====================================================

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
      "Using more weight than you can control.",
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
      "Pause briefly at the top without aggressively locking your elbows.",
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

  // =====================================================
  // TRICEPS
  // =====================================================

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

  "close-grip-push-ups": {
    name: "Close Grip Push Ups",
    category: "TRICEPS",
    description:
      "A bodyweight pressing movement that places greater emphasis on the triceps while still training the chest and core.",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    muscles: ["Triceps", "Chest", "Front Delts", "Core"],
    sets: "3",
    reps: "8-12",
    rest: "60 sec",
    instructions: [
      "Start in a high plank position.",
      "Place your hands closer together than a standard push-up.",
      "Brace your core and keep your body in a straight line.",
      "Lower your chest toward your hands under control.",
      "Keep your elbows relatively close to your body.",
      "Push through your hands to return to the starting position.",
    ],
    mistakes: [
      "Allowing your hips to sag.",
      "Flaring your elbows excessively.",
      "Moving too quickly.",
      "Losing control at the bottom.",
    ],
  },

  // =====================================================
  // BACK
  // =====================================================

  "lat-pulldown": {
    name: "Lat Pulldown",
    category: "BACK",
    description:
      "A vertical pulling exercise that develops the lats and improves upper-body pulling strength.",
    equipment: "Lat Pulldown Machine",
    difficulty: "Beginner",
    muscles: ["Latissimus Dorsi", "Biceps", "Upper Back"],
    sets: "4",
    reps: "10-12",
    rest: "75 sec",
    instructions: [
      "Sit comfortably at the lat pulldown machine.",
      "Grip the bar slightly wider than shoulder width.",
      "Brace your core and keep your chest lifted.",
      "Pull the bar toward your upper chest.",
      "Squeeze your back muscles at the bottom.",
      "Slowly return the bar to the starting position.",
    ],
    mistakes: [
      "Pulling the bar behind your neck.",
      "Using momentum to move the weight.",
      "Leaning too far backward.",
      "Using excessive weight.",
    ],
  },

  "barbell-row": {
    name: "Barbell Row",
    category: "BACK",
    description:
      "A compound pulling movement that develops back thickness, strength, and upper-body stability.",
    equipment: "Barbell",
    difficulty: "Intermediate",
    muscles: ["Lats", "Rhomboids", "Traps", "Biceps"],
    sets: "4",
    reps: "8-10",
    rest: "90 sec",
    instructions: [
      "Stand with your feet approximately hip-width apart.",
      "Hold the bar with a comfortable overhand grip.",
      "Hinge at your hips while keeping your back neutral.",
      "Brace your core and keep your chest stable.",
      "Pull the bar toward your lower ribs.",
      "Lower the bar slowly and repeat.",
    ],
    mistakes: [
      "Rounding the lower back.",
      "Using excessive momentum.",
      "Shrugging the shoulders during the row.",
      "Using more weight than you can control.",
    ],
  },

  "seated-cable-row": {
    name: "Seated Cable Row",
    category: "BACK",
    description:
      "A controlled horizontal pulling exercise that develops the middle back and improves posture and pulling strength.",
    equipment: "Cable Row Machine",
    difficulty: "Beginner",
    muscles: ["Middle Back", "Lats", "Rhomboids", "Biceps"],
    sets: "3",
    reps: "10-12",
    rest: "75 sec",
    instructions: [
      "Sit on the cable row machine with your feet supported.",
      "Grip the handle with both hands.",
      "Keep your chest lifted and spine neutral.",
      "Pull the handle toward your lower ribs.",
      "Squeeze your shoulder blades together.",
      "Return the handle slowly while maintaining control.",
    ],
    mistakes: [
      "Rounding your back.",
      "Using your body to swing the weight.",
      "Pulling the handle too high.",
      "Letting the weight return too quickly.",
    ],
  },

  "dumbbell-curl": {
    name: "Dumbbell Curl",
    category: "BICEPS",
    description:
      "A classic arm exercise that isolates the biceps and develops elbow-flexion strength.",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    muscles: ["Biceps", "Forearms"],
    sets: "3",
    reps: "10-12",
    rest: "60 sec",
    instructions: [
      "Stand upright with a dumbbell in each hand.",
      "Keep your elbows close to your sides.",
      "Curl the dumbbells upward without swinging.",
      "Squeeze your biceps at the top.",
      "Lower the dumbbells slowly.",
      "Repeat for the desired number of repetitions.",
    ],
    mistakes: [
      "Swinging the body.",
      "Moving the elbows forward.",
      "Using excessive weight.",
      "Dropping the dumbbells quickly.",
    ],
  },

  "pull-ups": {
    name: "Pull Ups",
    category: "BACK",
    description:
      "A challenging bodyweight pulling exercise that develops back and arm strength.",
    equipment: "Pull Up Bar",
    difficulty: "Advanced",
    muscles: ["Lats", "Biceps", "Upper Back", "Core"],
    sets: "3",
    reps: "6-10",
    rest: "120 sec",
    instructions: [
      "Grip the pull-up bar slightly wider than shoulder width.",
      "Hang with your arms extended and core engaged.",
      "Pull your body upward by driving your elbows down.",
      "Continue until your chin reaches or passes the bar.",
      "Lower yourself under control.",
      "Repeat without excessive swinging.",
    ],
    mistakes: [
      "Swinging excessively.",
      "Using only the arms.",
      "Performing uncontrolled repetitions.",
      "Shrugging the shoulders throughout the movement.",
    ],
  },

  "dumbbell-row": {
    name: "Dumbbell Row",
    category: "BACK",
    description:
      "A unilateral pulling movement that develops back strength while allowing focused control on each side.",
    equipment: "Dumbbell + Bench",
    difficulty: "Intermediate",
    muscles: ["Lats", "Rhomboids", "Traps", "Biceps"],
    sets: "3",
    reps: "10-12",
    rest: "75 sec",
    instructions: [
      "Place one hand and knee on a stable bench.",
      "Hold the dumbbell with your opposite hand.",
      "Keep your back neutral and core engaged.",
      "Pull the dumbbell toward your hip.",
      "Squeeze your back at the top.",
      "Lower the dumbbell under control.",
    ],
    mistakes: [
      "Rotating the torso excessively.",
      "Rounding the back.",
      "Using momentum.",
      "Pulling the dumbbell toward the shoulder instead of the hip.",
    ],
  },

  "face-pull": {
    name: "Face Pull",
    category: "SHOULDERS & BACK",
    description:
      "A cable exercise that trains the rear shoulders and upper back while encouraging controlled shoulder movement.",
    equipment: "Cable Machine + Rope",
    difficulty: "Beginner",
    muscles: ["Rear Delts", "Traps", "Rhomboids"],
    sets: "3",
    reps: "12-15",
    rest: "60 sec",
    instructions: [
      "Attach a rope to a cable at approximately upper-chest or face height.",
      "Grip the rope with both hands.",
      "Step back and brace your core.",
      "Pull the rope toward your face.",
      "Rotate your hands outward as you pull.",
      "Return slowly to the starting position.",
    ],
    mistakes: [
      "Using excessive weight.",
      "Pulling the rope too low.",
      "Using momentum.",
      "Arching the lower back.",
    ],
  },

  // =====================================================
  // LEGS
  // =====================================================

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
      "Rounding your lower back.",
      "Lifting your heels from the floor.",
      "Using more weight than you can control.",
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
    sets: "3",
    reps: "12-15",
    rest: "60 sec",
    instructions: [
      "Stand with your feet about shoulder-width apart.",
      "Keep your chest up and your core engaged.",
      "Push your hips back and bend your knees to lower your body.",
      "Lower until your thighs are approximately parallel to the floor, or as far as comfortable.",
      "Keep your knees aligned with your toes.",
      "Drive through your feet to return to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
    mistakes: [
      "Allowing the knees to collapse inward.",
      "Lifting the heels.",
      "Rounding the back.",
      "Dropping too quickly into the squat.",
    ],
  },

  "leg-press": {
    name: "Leg Press",
    category: "LEGS",
    description:
      "A machine-based lower-body exercise that allows controlled loading of the quadriceps and glutes.",
    equipment: "Leg Press Machine",
    difficulty: "Beginner",
    muscles: ["Quadriceps", "Glutes", "Hamstrings"],
    sets: "4",
    reps: "10-12",
    rest: "90 sec",
    instructions: [
      "Sit securely on the leg press machine.",
      "Place your feet shoulder-width apart on the platform.",
      "Brace your core and release the safety handles.",
      "Lower the platform under control.",
      "Press through your feet to extend your legs.",
      "Return to the starting position without locking your knees aggressively.",
    ],
    mistakes: [
      "Allowing the lower back to lift from the pad.",
      "Locking the knees aggressively.",
      "Using excessive weight.",
      "Lowering the platform too quickly.",
    ],
  },

  "romanian-deadlift": {
    name: "Romanian Deadlift",
    category: "HAMSTRINGS",
    description:
      "A hip-hinge movement that emphasizes the hamstrings and glutes while developing posterior-chain strength.",
    equipment: "Barbell",
    difficulty: "Intermediate",
    muscles: ["Hamstrings", "Glutes", "Lower Back"],
    sets: "3",
    reps: "8-10",
    rest: "90 sec",
    instructions: [
      "Stand tall while holding the barbell in front of your thighs.",
      "Keep your knees slightly bent.",
      "Push your hips backward while lowering the bar.",
      "Keep the bar close to your legs.",
      "Lower until you feel a controlled stretch in your hamstrings.",
      "Drive your hips forward to return to standing.",
    ],
    mistakes: [
      "Rounding the lower back.",
      "Bending the knees too much.",
      "Moving the bar away from the body.",
      "Dropping the weight quickly.",
    ],
  },

  "leg-curl": {
    name: "Leg Curl",
    category: "HAMSTRINGS",
    description:
      "An isolation exercise that directly trains the hamstrings through knee flexion.",
    equipment: "Leg Curl Machine",
    difficulty: "Beginner",
    muscles: ["Hamstrings", "Calves"],
    sets: "3",
    reps: "12-15",
    rest: "60 sec",
    instructions: [
      "Position yourself securely on the leg curl machine.",
      "Align your knees with the machine pivot point.",
      "Place the pad comfortably above your ankles.",
      "Curl your heels toward your glutes.",
      "Pause briefly at the contracted position.",
      "Return the weight slowly.",
    ],
    mistakes: [
      "Using excessive weight.",
      "Lifting your hips from the pad.",
      "Using momentum.",
      "Dropping the weight quickly.",
    ],
  },

  "walking-lunges": {
    name: "Walking Lunges",
    category: "LEGS",
    description:
      "A dynamic unilateral leg exercise that develops lower-body strength, balance, and coordination.",
    equipment: "Bodyweight or Dumbbells",
    difficulty: "Intermediate",
    muscles: ["Quadriceps", "Glutes", "Hamstrings", "Core"],
    sets: "3",
    reps: "12 each leg",
    rest: "75 sec",
    instructions: [
      "Stand tall with your feet hip-width apart.",
      "Step forward with one leg.",
      "Lower your hips until both knees are comfortably bent.",
      "Push through the front foot to move forward.",
      "Bring the opposite leg forward into the next lunge.",
      "Continue alternating legs.",
    ],
    mistakes: [
      "Allowing the front knee to collapse inward.",
      "Taking steps that are too short.",
      "Leaning excessively forward.",
      "Moving too quickly without control.",
    ],
  },

  "glute-bridge": {
    name: "Glute Bridge",
    category: "GLUTES",
    description:
      "A simple hip-extension exercise that strengthens the glutes and improves posterior-chain control.",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    muscles: ["Glutes", "Hamstrings", "Core"],
    sets: "3",
    reps: "15",
    rest: "60 sec",
    instructions: [
      "Lie on your back with your knees bent.",
      "Place your feet flat on the floor.",
      "Brace your core.",
      "Drive through your heels and lift your hips.",
      "Squeeze your glutes at the top.",
      "Lower your hips slowly back to the floor.",
    ],
    mistakes: [
      "Overarching the lower back.",
      "Pushing mainly through the toes.",
      "Moving too quickly.",
      "Failing to control the lowering phase.",
    ],
  },

  "dumbbell-goblet-squat": {
    name: "Dumbbell Goblet Squat",
    category: "LEGS",
    description:
      "A squat variation that uses a single dumbbell to develop lower-body strength and squat control.",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    muscles: ["Quadriceps", "Glutes", "Core"],
    sets: "3",
    reps: "10-12",
    rest: "60 sec",
    instructions: [
      "Hold one dumbbell vertically against your chest.",
      "Stand with your feet slightly wider than hip-width apart.",
      "Brace your core and keep your chest lifted.",
      "Lower into a controlled squat.",
      "Keep your knees tracking in line with your toes.",
      "Drive through your feet to stand.",
    ],
    mistakes: [
      "Letting the chest collapse forward.",
      "Allowing the knees to cave inward.",
      "Using excessive weight.",
      "Losing control during the descent.",
    ],
  },

  "dumbbell-deadlift": {
    name: "Dumbbell Deadlift",
    category: "POSTERIOR CHAIN",
    description:
      "A dumbbell-based hip-hinge exercise that develops the glutes, hamstrings, and back.",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    muscles: ["Hamstrings", "Glutes", "Back", "Core"],
    sets: "3",
    reps: "10-12",
    rest: "90 sec",
    instructions: [
      "Stand with a dumbbell in each hand.",
      "Keep your feet about hip-width apart.",
      "Brace your core and keep your spine neutral.",
      "Push your hips backward while lowering the dumbbells.",
      "Keep the dumbbells close to your legs.",
      "Drive your hips forward to stand tall.",
    ],
    mistakes: [
      "Rounding the lower back.",
      "Moving the weights too far from the body.",
      "Squatting instead of hinging.",
      "Using excessive weight.",
    ],
  },

  // =====================================================
  // SHOULDERS
  // =====================================================

  "shoulder-press": {
    name: "Shoulder Press",
    category: "SHOULDERS",
    description:
      "A vertical pressing exercise that develops shoulder strength and upper-body stability.",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    muscles: ["Shoulders", "Triceps", "Upper Chest"],
    sets: "4",
    reps: "8-10",
    rest: "90 sec",
    instructions: [
      "Sit or stand with a dumbbell in each hand.",
      "Position the dumbbells around shoulder height.",
      "Brace your core before pressing.",
      "Press both dumbbells overhead.",
      "Keep your movement controlled.",
      "Lower the dumbbells back to shoulder level.",
    ],
    mistakes: [
      "Arching the lower back excessively.",
      "Using momentum.",
      "Lowering the weights too quickly.",
      "Using excessive weight.",
    ],
  },

  "overhead-press": {
    name: "Overhead Press",
    category: "SHOULDERS",
    description:
      "A compound vertical pressing movement that develops shoulder and triceps strength.",
    equipment: "Barbell",
    difficulty: "Intermediate",
    muscles: ["Shoulders", "Triceps", "Upper Chest", "Core"],
    sets: "4",
    reps: "6-8",
    rest: "120 sec",
    instructions: [
      "Stand with the bar positioned at upper-chest height.",
      "Grip the bar slightly wider than shoulder width.",
      "Brace your core and keep your body stable.",
      "Press the bar overhead in a controlled path.",
      "Move your head naturally as the bar passes.",
      "Lower the bar back to shoulder level.",
    ],
    mistakes: [
      "Excessive lower-back arch.",
      "Pressing the bar too far forward.",
      "Using momentum.",
      "Using more weight than you can control.",
    ],
  },

  "dumbbell-lateral-raise": {
    name: "Dumbbell Lateral Raise",
    category: "SHOULDERS",
    description:
      "An isolation exercise that targets the lateral deltoids and helps build shoulder width.",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    muscles: ["Lateral Delts", "Shoulders"],
    sets: "3",
    reps: "12-15",
    rest: "60 sec",
    instructions: [
      "Stand tall with a dumbbell in each hand.",
      "Keep a slight bend in your elbows.",
      "Raise the dumbbells outward to approximately shoulder height.",
      "Keep the movement controlled.",
      "Pause briefly at the top.",
      "Lower the dumbbells slowly.",
    ],
    mistakes: [
      "Swinging the dumbbells.",
      "Using excessive weight.",
      "Shrugging the shoulders.",
      "Raising the weights too high.",
    ],
  },

  "rear-delt-fly": {
    name: "Rear Delt Fly",
    category: "SHOULDERS",
    description:
      "An isolation exercise that targets the rear shoulders and upper back.",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    muscles: ["Rear Delts", "Rhomboids", "Upper Back"],
    sets: "3",
    reps: "12-15",
    rest: "60 sec",
    instructions: [
      "Hold a dumbbell in each hand.",
      "Hinge forward while keeping your back neutral.",
      "Allow your arms to hang naturally.",
      "Raise the dumbbells outward.",
      "Squeeze your rear shoulders at the top.",
      "Lower the dumbbells slowly.",
    ],
    mistakes: [
      "Using momentum.",
      "Rounding the back.",
      "Using excessive weight.",
      "Shrugging during the movement.",
    ],
  },

  // =====================================================
  // FULL BODY / FAT LOSS
  // =====================================================

  "mountain-climbers": {
    name: "Mountain Climbers",
    category: "FULL BODY",
    description:
      "A dynamic bodyweight movement that increases heart rate while training the core and lower body.",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    muscles: ["Core", "Shoulders", "Hip Flexors", "Legs"],
    sets: "3",
    reps: "30 sec",
    rest: "45 sec",
    instructions: [
      "Start in a high plank position.",
      "Keep your shoulders stacked over your hands.",
      "Drive one knee toward your chest.",
      "Return that leg while bringing the opposite knee forward.",
      "Continue alternating legs.",
      "Maintain a stable torso throughout.",
    ],
    mistakes: [
      "Raising the hips too high.",
      "Allowing the lower back to sag.",
      "Moving without control.",
      "Holding your breath.",
    ],
  },

  "jumping-jacks": {
    name: "Jumping Jacks",
    category: "CARDIO",
    description:
      "A simple full-body cardio movement that increases heart rate and prepares the body for training.",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    muscles: ["Legs", "Shoulders", "Core"],
    sets: "3",
    reps: "30 sec",
    rest: "30 sec",
    instructions: [
      "Stand tall with your feet together.",
      "Keep your arms relaxed by your sides.",
      "Jump while moving your feet outward.",
      "Raise your arms overhead at the same time.",
      "Jump back to the starting position.",
      "Repeat at a controlled pace.",
    ],
    mistakes: [
      "Landing with locked knees.",
      "Using uncontrolled movements.",
      "Landing heavily.",
      "Rushing the movement.",
    ],
  },

  burpees: {
    name: "Burpees",
    category: "FULL BODY",
    description:
      "A high-intensity full-body movement combining strength, coordination, and cardiovascular conditioning.",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    muscles: ["Chest", "Legs", "Shoulders", "Core"],
    sets: "3",
    reps: "8-12",
    rest: "60 sec",
    instructions: [
      "Start standing with your feet about shoulder-width apart.",
      "Squat down and place your hands on the floor.",
      "Step or jump your feet back into a plank.",
      "Perform a controlled push-up if appropriate.",
      "Bring your feet back underneath you.",
      "Stand or jump vertically.",
    ],
    mistakes: [
      "Landing heavily.",
      "Allowing the hips to sag in the plank.",
      "Moving too quickly without control.",
      "Skipping the recovery between repetitions.",
    ],
  },

  "high-knees": {
    name: "High Knees",
    category: "CARDIO",
    description:
      "A dynamic cardio exercise that improves conditioning, coordination, and lower-body movement speed.",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    muscles: ["Hip Flexors", "Quadriceps", "Calves", "Core"],
    sets: "3",
    reps: "30 sec",
    rest: "30 sec",
    instructions: [
      "Stand tall with your feet about hip-width apart.",
      "Begin jogging in place.",
      "Drive one knee upward toward your waist.",
      "Quickly switch to the opposite leg.",
      "Pump your arms naturally.",
      "Maintain an upright posture throughout.",
    ],
    mistakes: [
      "Leaning too far backward.",
      "Landing heavily.",
      "Holding your breath.",
      "Losing control of your movement.",
    ],
  },

  // =====================================================
  // CORE
  // =====================================================

  plank: {
    name: "Plank",
    category: "CORE",
    description:
      "An isometric core exercise that develops trunk stability and endurance.",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    muscles: ["Core", "Shoulders", "Glutes"],
    sets: "3",
    reps: "30-60 sec",
    rest: "45 sec",
    instructions: [
      "Start on your forearms and toes.",
      "Keep your elbows underneath your shoulders.",
      "Brace your core and squeeze your glutes.",
      "Keep your body in a straight line.",
      "Breathe steadily while maintaining the position.",
      "Hold for the desired duration.",
    ],
    mistakes: [
      "Allowing the hips to sag.",
      "Raising the hips too high.",
      "Holding your breath.",
      "Looking excessively upward.",
    ],
  },

  // =====================================================
  // STRENGTH / POWER
  // =====================================================

  deadlift: {
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

  "box-jumps": {
    name: "Box Jumps",
    category: "POWER",
    description:
      "An explosive lower-body movement that develops power, coordination, and athletic conditioning.",
    equipment: "Plyometric Box",
    difficulty: "Advanced",
    muscles: ["Quadriceps", "Glutes", "Calves", "Core"],
    sets: "3",
    reps: "8-10",
    rest: "90 sec",
    instructions: [
      "Stand facing a stable plyometric box.",
      "Bend your knees and hips slightly.",
      "Swing your arms and jump onto the box.",
      "Land softly with both feet.",
      "Stand tall on the box.",
      "Step down carefully and repeat.",
    ],
    mistakes: [
      "Using an unstable box.",
      "Landing with stiff knees.",
      "Jumping before being ready.",
      "Jumping down unnecessarily.",
    ],
  },

  "battle-rope": {
    name: "Battle Rope",
    category: "CONDITIONING",
    description:
      "A high-intensity conditioning exercise that challenges the upper body and cardiovascular system.",
    equipment: "Battle Rope",
    difficulty: "Intermediate",
    muscles: ["Shoulders", "Arms", "Core", "Back"],
    sets: "3",
    reps: "30 sec",
    rest: "45 sec",
    instructions: [
      "Stand with your feet approximately shoulder-width apart.",
      "Hold one rope end in each hand.",
      "Bend your knees slightly and brace your core.",
      "Move your arms alternately to create waves.",
      "Maintain a stable lower body.",
      "Continue for the prescribed duration.",
    ],
    mistakes: [
      "Using only the wrists.",
      "Standing with locked knees.",
      "Losing your core position.",
      "Starting too aggressively.",
    ],
  },

  "sprint-intervals": {
    name: "Sprint Intervals",
    category: "CARDIO",
    description:
      "Short high-intensity running intervals designed to improve speed and cardiovascular conditioning.",
    equipment: "Track or Treadmill",
    difficulty: "Advanced",
    muscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves"],
    sets: "6",
    reps: "20 sec",
    rest: "60-90 sec",
    instructions: [
      "Warm up thoroughly before sprinting.",
      "Begin each interval from a controlled starting position.",
      "Accelerate progressively rather than jumping instantly to maximum speed.",
      "Maintain strong posture while running.",
      "Slow down gradually after each interval.",
      "Recover fully before the next sprint.",
    ],
    mistakes: [
      "Skipping the warm-up.",
      "Starting at maximum intensity without preparation.",
      "Ignoring fatigue.",
      "Continuing despite loss of running control.",
    ],
  },
};

function ExerciseDetails() {
  const { exerciseId } = useParams();

  const exercise = exerciseData[exerciseId];

  if (!exercise) {
    return (
      <div className="exercise-details-page">
        <div className="exercise-container">
          <Link to="/programs" className="exercise-back-link">
            ← Back to Programs
          </Link>

          <div className="exercise-not-found">
            <p className="eyebrow">404 / EXERCISE</p>

            <h1>
              Exercise <span>Not Found</span>
            </h1>

            <p>
              The exercise ID <strong>{exerciseId || "unknown"}</strong> does
              not exist in the workout library.
            </p>

            <Link to="/programs" className="exercise-back-link">
              Browse Programs →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="exercise-details-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="exercise-hero">
        <div className="exercise-container">
          <Link to="/programs" className="exercise-back-link">
            ← Back to Programs
          </Link>

          <div className="exercise-hero-grid">
            <div className="exercise-hero-content">
              <p className="eyebrow">{exercise.category}</p>

              <h1>{exercise.name}</h1>

              <p className="exercise-description">{exercise.description}</p>

              <div className="exercise-tags">
                <span>{exercise.difficulty}</span>
                <span>{exercise.equipment}</span>
              </div>
            </div>

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

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="exercise-main">
        <div className="exercise-container">
          {/* STATS */}

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

          {/* TARGET MUSCLES */}

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

          {/* INSTRUCTIONS */}

          <section className="exercise-section">
            <div className="exercise-section-heading">
              <p className="eyebrow">TECHNIQUE</p>

              <h2>
                How to <span>perform.</span>
              </h2>
            </div>

            <div className="instruction-list">
              {exercise.instructions.map((instruction, index) => (
                <div
                  className="instruction-item"
                  key={`${exerciseId}-instruction-${index}`}
                >
                  <span className="instruction-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>{instruction}</p>
                </div>
              ))}
            </div>
          </section>

          {/* MISTAKES */}

          <section className="exercise-section mistakes-section">
            <div className="exercise-section-heading">
              <p className="eyebrow">FORM CHECK</p>

              <h2>
                Avoid these <span>mistakes.</span>
              </h2>
            </div>

            <div className="mistakes-list">
              {exercise.mistakes.map((mistake, index) => (
                <div
                  className="mistake-item"
                  key={`${exerciseId}-mistake-${index}`}
                >
                  <span>×</span>

                  <p>{mistake}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="exercise-cta">
        <p className="eyebrow">READY?</p>

        <h2>
          Add it to your <span>workout.</span>
        </h2>

        <button
          className="exercise-complete-button"
          type="button"
          onClick={() => {
            console.log("Exercise selected:", exerciseId);
          }}
        >
          Start Exercise →
        </button>
      </section>
    </div>
  );
}

export default ExerciseDetails;
