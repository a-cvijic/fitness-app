import React, { useState, useEffect } from "react";
import "./Training.css";

const Training = () => {
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  useEffect(() => {
    fetchTrainingPrograms();
  }, []);

  const fetchTrainingPrograms = () => {
    fetch("http://studentdocker.informatika.uni-mb.si:11094/api/training")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTrainingPrograms(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deleteTrainingProgram = (trainingID) => {
    fetch(
      `http://studentdocker.informatika.uni-mb.si:11094/api/training/${trainingID}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        fetchTrainingPrograms(); // Re-fetch the training programs after deletion
      })
      .catch((error) => {
        console.error("Error deleting training program:", error);
      });
  };

  return (
    <div className="training-container">
      <h2>Training Programs</h2>
      {trainingPrograms.map((program) => (
        <div key={program.trainingID} className="training-item">
          <h3 className="training-title">{program.name}</h3>
          <p className="training-duration">Duration: {program.duration}</p>
          <p className="training-description">
            Description: {program.description}
          </p>
          <button onClick={() => deleteTrainingProgram(program.trainingID)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Training;
