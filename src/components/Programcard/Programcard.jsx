import "./Programcard.css";
import { useNavigate } from "react-router-dom";

function Programcard({ program }) {
  const navigate = useNavigate();

  const handleViewProgram = () => {
    navigate(`/programs/${program.id}`);
  };

  return (
    <article className="program-card">
      {/* Workout Image */}
      <div className="program-card-image">
        <img src={program.image} alt={program.title} />

        <div className="program-card-image-info">
          <span className="program-number">{program.number}</span>
          <span className="program-level">{program.level}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="program-card-content">
        <h3>{program.title}</h3>

        <p>{program.description}</p>

        <div className="program-details">
          <div>
            <small>DURATION</small>
            <strong>{program.duration}</strong>
          </div>

          <div>
            <small>FREQUENCY</small>
            <strong>{program.frequency}</strong>
          </div>

          <div>
            <small>EQUIPMENT</small>
            <strong>{program.equipment}</strong>
          </div>
        </div>

        <button className="program-card-button" onClick={handleViewProgram}>
          View Program
          <span>→</span>
        </button>
      </div>
    </article>
  );
}

export default Programcard;
