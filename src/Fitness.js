import React from "react";
import "./Fitness.css";

const Fitness = () => {
  const fitnessClasses = [
    {
      id: 1,
      name: "Yoga",
      description: "A relaxing class focused on stretching and mindfulness",
    },
    {
      id: 2,
      name: "HIIT",
      description: "High-Intensity Interval Training for a fast-paced workout.",
    },
    {
      id: 3,
      name: "Pilates",
      description:
        "Improve your strength and flexibility with controlled movements.",
    },
  ];

  return (
    <div className="fitness-container">
      <h2>Fitness Classes</h2>
      <ul className="fitness-list">
        {fitnessClasses.map((fitnessClass) => (
          <li key={fitnessClass.id} className="fitness-class">
            <h3 className="fitness-class-name">{fitnessClass.name}</h3>
            <p className="fitness-class-description">
              {fitnessClass.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fitness;
