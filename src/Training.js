import React, { useState, useEffect } from "react";
import "./Training.css";

const Training = () => {
  const [trainingPrograms, setTrainingPrograms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/training")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the data received from the API
        setTrainingPrograms(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
          {/* You can display other fields like participants and progress here */}
        </div>
      ))}
    </div>
  );
};

export default Training;
