import { useEffect, useState } from "react";
import "./SplashScreen.css";

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    // Loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          // Show title after loader finishes
          setTimeout(() => {
            setShowBrand(true);
          }, 300);

          // Finish splash
          setTimeout(() => {
            onComplete();
          }, 2500);

          return 100;
        }

        return prev + 1;
      });
    }, 38);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`splash-screen ${showBrand ? "show-brand" : ""}`}>
      {!showBrand ? (
        <div className="loader-container">
          <div className="loader-percentage">
            {String(progress).padStart(2, "0")}%
          </div>

          <div className="loader-track">
            <div
              className="loader-progress"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="brand-container">
          <h1 className="brand-title">
            <span>FIT</span>
            <span>FORGE</span>
          </h1>

          <p className="brand-subtitle">FORGE YOUR STRONGER SELF</p>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
