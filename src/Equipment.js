import React, { useState, useEffect } from "react";
import "./Equipment.css";

const Equipment = () => {
  const [equipmentList, setEquipments] = useState([]);

  useEffect(() => {
    fetch("http://studentdocker.informatika.uni-mb.si:11091/equipments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setEquipments(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="equipment-container">
      <h2>Gym Equipment</h2>
      {equipmentList.map((item) => (
        <div key={item.id} className="equipment-item">
          <h3 className="equipment-name">{item.name}</h3>
          <p className="equipment-availability">
            Availability: {item.isAvailable}
          </p>
          <p className="equipment-availability">Quantity: {item.quantity}</p>
          <p className="equipment-availability">
            Last maintenance date: {item.lastMaintenanceDate}
          </p>
          <p className="equipment-availability">Fitness: {item.fitnessId}</p>
        </div>
      ))}
    </div>
  );
};

export default Equipment;
