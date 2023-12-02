import React from "react";
import "./Equipment.css";

const equipmentList = [
  { id: 1, name: "Treadmill", availability: "In stock" },
  { id: 2, name: "Dumbbell Set", availability: "3 sets left" },
  { id: 3, name: "Yoga Mat", availability: "Out of stock" },
];

const Equipment = () => {
  return (
    <div className="equipment-container">
      <h2>Gym Equipment</h2>
      {equipmentList.map((item) => (
        <div key={item.id} className="equipment-item">
          <h3 className="equipment-name">{item.name}</h3>
          <p className="equipment-availability">
            Availability: {item.availability}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Equipment;
