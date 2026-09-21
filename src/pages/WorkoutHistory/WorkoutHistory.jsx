import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Dumbbell, Flame, Clock, CalendarDays } from "lucide-react";
import "./WorkoutHistory.css";

function WorkoutHistory() {
  const navigate = useNavigate();

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      try {
        const token = localStorage.getItem("fitforge_token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/workout-history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch workout history");
        }

        setWorkouts(data.workouts || []);
      } catch (error) {
        console.error("Workout history error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutHistory();
  }, [navigate]);

  return (
    <main className="workout-history-page">
      <div className="workout-history-container">
        {/* HEADER */}

        <div className="history-header">
          <button
            className="history-back-button"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>

          <span className="history-label">YOUR ACTIVITY</span>

          <h1>Workout History</h1>

          <p>
            Track every workout you've completed and see your progress over
            time.
          </p>
        </div>

        {/* CONTENT */}

        {loading ? (
          <div className="history-state">
            <Dumbbell size={28} />
            <p>Loading workout history...</p>
          </div>
        ) : workouts.length === 0 ? (
          <div className="history-state">
            <Dumbbell size={32} />

            <h2>No workouts yet</h2>

            <p>Complete your first workout and it will appear here.</p>

            <button
              className="start-history-workout"
              onClick={() => navigate("/programs")}
            >
              Explore Programs
            </button>
          </div>
        ) : (
          <div className="history-list">
            {workouts.map((workout) => (
              <div className="history-card" key={workout.id}>
                {/* ICON */}

                <div className="history-workout-icon">
                  <Dumbbell size={22} />
                </div>

                {/* MAIN INFO */}

                <div className="history-workout-info">
                  <span className="history-workout-type">
                    WORKOUT COMPLETED
                  </span>

                  <h2>{workout.workout_name}</h2>

                  <div className="history-meta">
                    <span>
                      <Clock size={15} />
                      {workout.duration} min
                    </span>

                    <span>
                      <Flame size={15} />
                      {workout.calories} kcal
                    </span>

                    <span>
                      <CalendarDays size={15} />
                      {new Date(workout.completed_at).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>

                {/* CALORIES */}

                <div className="history-calories">
                  <strong>{workout.calories}</strong>

                  <span>CALORIES</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default WorkoutHistory;
