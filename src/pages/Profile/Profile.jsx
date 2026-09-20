import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Dumbbell,
  Flame,
  Target,
  CalendarDays,
  Mail,
  User,
  LogOut,
  ArrowRight,
} from "lucide-react";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    currentStreak: 0,
    thisMonth: 0,
  });

  const [loading, setLoading] = useState(true);

  // =========================
  // EDIT PROFILE STATES
  // =========================

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  // =========================
  // FETCH PROFILE
  // =========================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("fitforge_token");

        if (!token) {
          navigate("/login");
          return;
        }

        // =========================
        // FETCH USER
        // =========================

        const userResponse = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await userResponse.json();

        if (!userResponse.ok) {
          throw new Error(userData.message || "Unable to fetch profile");
        }

        setUser(userData.user);

        setEditName(userData.user.name || "");

        localStorage.setItem("fitforge_user", JSON.stringify(userData.user));

        // =========================
        // FETCH STATS
        // =========================

        const statsResponse = await fetch(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const statsData = await statsResponse.json();

        if (statsResponse.ok) {
          setStats(statsData.stats);
        }
      } catch (error) {
        console.error("Profile error:", error);

        localStorage.removeItem("fitforge_token");
        localStorage.removeItem("fitforge_user");

        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // =========================
  // EDIT PROFILE
  // =========================

  const handleEditProfile = () => {
    setEditName(user?.name || "");
    setProfileMessage("");
    setIsEditing(true);
  };

  // =========================
  // SAVE PROFILE
  // =========================

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      setProfileMessage("Name cannot be empty");
      return;
    }

    try {
      setSavingProfile(true);
      setProfileMessage("");

      const token = localStorage.getItem("fitforge_token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editName.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update profile");
      }

      setUser(data.user);

      setEditName(data.user.name || "");

      localStorage.setItem("fitforge_user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("fitforge-auth-change"));

      setIsEditing(false);

      setProfileMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);

      setProfileMessage(error.message || "Unable to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("fitforge_token");
    localStorage.removeItem("fitforge_user");

    window.dispatchEvent(new Event("fitforge-auth-change"));

    navigate("/");
  };

  // =========================
  // FORMAT NAME
  // =========================

  const formattedName = user?.name
    ? user.name
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "User";

  // =========================
  // JOIN DATE
  // =========================

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "—";

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-loading">
          <Dumbbell size={28} />
          <span>Loading profile...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-container">
        {/* =========================
            BACK TO DASHBOARD
        ========================= */}

        <button
          className="profile-back-button"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={17} />
          Dashboard
        </button>

        {/* =========================
            PROFILE HERO
        ========================= */}

        <section className="profile-hero">
          <div className="profile-avatar">{formattedName.charAt(0)}</div>

          <div className="profile-hero-content">
            <span className="profile-label">FITFORGE MEMBER</span>

            <h1>{formattedName}</h1>

            <p>Your journey. Your progress. Your stronger version.</p>
          </div>

          <div className="profile-member-date">
            <span>MEMBER SINCE</span>
            <strong>{joinedDate}</strong>
          </div>
        </section>

        {/* =========================
            ACCOUNT INFORMATION
        ========================= */}

        <section className="profile-section">
          <div className="profile-section-heading">
            <div>
              <span>ACCOUNT</span>
              <h2>Personal Information</h2>
            </div>

            {!isEditing && (
              <button
                className="profile-edit-button"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="profile-info-grid">
            {/* NAME */}

            <div className="profile-info-card">
              <div className="profile-info-icon">
                <User size={20} />
              </div>

              <div className="profile-edit-content">
                <span>FULL NAME</span>

                {isEditing ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="profile-name-input"
                    autoFocus
                  />
                ) : (
                  <strong>{formattedName}</strong>
                )}
              </div>
            </div>

            {/* EMAIL */}

            <div className="profile-info-card">
              <div className="profile-info-icon">
                <Mail size={20} />
              </div>

              <div>
                <span>EMAIL ADDRESS</span>
                <strong>{user?.email || "—"}</strong>
              </div>
            </div>
          </div>

          {/* =========================
              EDIT ACTIONS
          ========================= */}

          {isEditing && (
            <div className="profile-edit-actions">
              <button
                className="profile-cancel-button"
                onClick={() => {
                  setIsEditing(false);
                  setEditName(user?.name || "");
                  setProfileMessage("");
                }}
                disabled={savingProfile}
              >
                Cancel
              </button>

              <button
                className="profile-save-button"
                onClick={handleSaveProfile}
                disabled={savingProfile}
              >
                {savingProfile ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}

          {profileMessage && (
            <p className="profile-message">{profileMessage}</p>
          )}
        </section>

        {/* =========================
            FITNESS OVERVIEW
        ========================= */}

        <section className="profile-section">
          <div className="profile-section-heading">
            <div>
              <span>YOUR PROGRESS</span>
              <h2>Fitness Overview</h2>
            </div>

            <button
              className="profile-history-button"
              onClick={() => navigate("/workout-history")}
            >
              Workout History
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="profile-stats">
            {/* WORKOUTS */}

            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <Dumbbell size={21} />
              </div>

              <span>WORKOUTS</span>

              <strong>{stats.totalWorkouts}</strong>

              <small>Total completed</small>
            </div>

            {/* CALORIES */}

            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <Flame size={21} />
              </div>

              <span>CALORIES</span>

              <strong>{stats.totalCalories.toLocaleString()}</strong>

              <small>Calories burned</small>
            </div>

            {/* STREAK */}

            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <Target size={21} />
              </div>

              <span>STREAK</span>

              <strong>{stats.currentStreak}</strong>

              <small>
                {stats.currentStreak === 1 ? "Day" : "Days"} current streak
              </small>
            </div>

            {/* THIS MONTH */}

            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <CalendarDays size={21} />
              </div>

              <span>THIS MONTH</span>

              <strong>{stats.thisMonth}</strong>

              <small>Workouts completed</small>
            </div>
          </div>
        </section>

        {/* =========================
            ACCOUNT ACTIONS
        ========================= */}

        <section className="profile-actions-section">
          <div>
            <span>ACCOUNT SETTINGS</span>
            <h2>Manage your FitForge account</h2>
          </div>

          <div className="profile-actions">
            <button
              className="profile-action-button history"
              onClick={() => navigate("/workout-history")}
            >
              <Dumbbell size={18} />
              Workout History
              <ArrowRight size={16} />
            </button>

            <button
              className="profile-action-button logout"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;
