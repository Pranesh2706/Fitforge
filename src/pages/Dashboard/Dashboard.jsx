import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dumbbell,
  Flame,
  Target,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    currentStreak: 0,
    thisMonth: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(true);

  // =========================
  // FETCH USER
  // =========================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("fitforge_token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch user");
        }

        setUser(data.user);

        localStorage.setItem("fitforge_user", JSON.stringify(data.user));
      } catch (error) {
        console.error("Dashboard user error:", error);

        localStorage.removeItem("fitforge_token");
        localStorage.removeItem("fitforge_user");

        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // =========================
  // FETCH DASHBOARD STATS
  // =========================

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("fitforge_token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch dashboard stats");
        }

        setStats(data.stats);
      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchDashboardStats();
  }, [navigate]);

  useEffect(() => {
    const fetchRecentWorkouts = async () => {
      try {
        const token = localStorage.getItem("fitforge_token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/dashboard/recent-workouts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch recent workouts");
        }

        setRecentWorkouts(data.workouts);
      } catch (error) {
        console.error("Recent workouts error:", error);
      } finally {
        setLoadingWorkouts(false);
      }
    };

    fetchRecentWorkouts();
  }, [navigate]);

  // =========================
  // FIRST NAME
  // =========================

  const firstName = user?.name
    ? user.name.toLowerCase().split(" ")[0].charAt(0).toUpperCase() +
      user.name.toLowerCase().split(" ")[0].slice(1)
    : "User";

  return (
    <main className="dashboard-page">
      <section className="dashboard-container">
        {/* =========================
            HEADER
        ========================= */}

        <div className="dashboard-header">
          <div>
            <span className="dashboard-label">FITFORGE DASHBOARD</span>

            <h1>
              Welcome back, <span>{firstName}</span> 👋
            </h1>

            <p>
              Keep showing up. Your stronger version is built one workout at a
              time.
            </p>
          </div>

          <button
            className="dashboard-workout-btn"
            onClick={() => navigate("/programs")}
          >
            Explore Workouts
            <ArrowRight size={18} />
          </button>
        </div>

        {/* =========================
            STATS
        ========================= */}

        <div className="dashboard-stats">
          {/* WORKOUTS */}

          <div className="dashboard-stat-card">
            <div className="stat-icon">
              <Dumbbell size={22} />
            </div>

            <div>
              <span>Workouts</span>

              <strong>{loadingStats ? "—" : stats.totalWorkouts}</strong>
            </div>
          </div>

          {/* CALORIES */}

          <div className="dashboard-stat-card">
            <div className="stat-icon">
              <Flame size={22} />
            </div>

            <div>
              <span>Calories Burned</span>

              <strong>
                {loadingStats ? "—" : stats.totalCalories.toLocaleString()}
              </strong>
            </div>
          </div>

          {/* STREAK */}

          <div className="dashboard-stat-card">
            <div className="stat-icon">
              <Target size={22} />
            </div>

            <div>
              <span>Current Streak</span>

              <strong>
                {loadingStats
                  ? "—"
                  : `${stats.currentStreak} ${
                      stats.currentStreak === 1 ? "Day" : "Days"
                    }`}
              </strong>
            </div>
          </div>

          {/* THIS MONTH */}

          <div className="dashboard-stat-card">
            <div className="stat-icon">
              <CalendarDays size={22} />
            </div>

            <div>
              <span>This Month</span>

              <strong>{loadingStats ? "—" : stats.thisMonth}</strong>
            </div>
          </div>
        </div>

        {/* =========================
            TODAY'S WORKOUT
        ========================= */}

        <section className="today-workout">
          <div className="section-heading">
            <div>
              <span>TODAY'S PLAN</span>

              <h2>Ready to train?</h2>
            </div>

            <span className="workout-status">NOT STARTED</span>
          </div>

          <div className="workout-card">
            <div className="workout-info">
              <span>STRENGTH</span>

              <h3>Chest & Triceps</h3>

              <p>
                Build strength and muscle with a focused upper-body workout.
              </p>

              <div className="workout-meta">
                <span>6 Exercises</span>
                <span>45 Minutes</span>
                <span>Intermediate</span>
              </div>
            </div>

            <button
              className="start-workout-btn"
              onClick={() => navigate("/programs")}
            >
              Start Workout
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* =========================
    RECENT WORKOUTS
========================= */}

        <section className="recent-workouts">
          <div className="section-heading">
            <div>
              <span>YOUR ACTIVITY</span>
              <h2>Recent Workouts</h2>
            </div>

            <div className="recent-workouts-actions">
              <span className="workout-count">
                {recentWorkouts.length} workouts
              </span>

              <button
                className="view-all-workouts-btn"
                onClick={() => navigate("/workout-history")}
              >
                View All
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="recent-workouts-list">
            {loadingWorkouts ? (
              <div className="recent-workout-empty">Loading workouts...</div>
            ) : recentWorkouts.length === 0 ? (
              <div className="recent-workout-empty">
                <Dumbbell size={24} />
                <p>No workouts completed yet.</p>
                <button onClick={() => navigate("/programs")}>
                  Start Your First Workout
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              recentWorkouts.map((workout) => (
                <div className="recent-workout-item" key={workout.id}>
                  <div className="recent-workout-icon">
                    <Dumbbell size={20} />
                  </div>

                  <div className="recent-workout-details">
                    <h3>{workout.workout_name}</h3>

                    <div>
                      <span>{workout.duration} min</span>
                      <span>{workout.calories} kcal</span>
                    </div>
                  </div>

                  <div className="recent-workout-date">
                    {new Date(workout.completed_at).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                      },
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Dashboard;
