import React from "react";
import "./Training.css";

const trainingPrograms = [
  { id: 1, title: "Beginner Bootcamp", duration: "4 weeks" },
  { id: 2, title: "Marathon Prep", duration: "12 weeks" },
  { id: 3, title: "Strength Training", duration: "6 weeks" },
];

const Training = () => {
  return (
    <div className="training-container">
      <h2>Training Programs</h2>
      {trainingPrograms.map((program) => (
        <div key={program.id} className="training-item">
          <h3 className="training-title">{program.title}</h3>
          <p className="training-duration">Duration: {program.duration}</p>
        </div>
      ))}
    </div>
  );
};

export default Training;
