import React, { useState, useEffect } from "react";

function Booking() {
  const [classType, setClassType] = useState("");
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const bookingDate = new Date();
  const userId = 1;

  useEffect(() => {
    fetch("http://localhost:11094/api/training")
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

  useEffect(() => {
    fetch("http://localhost:11092/time-slots")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the data received from the API
        setTimeSlots(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClassTypeChange = (e) => {
    setClassType(e.target.value);
  };

  const handleTimeSlotChange = (e) => {
    setSelectedTimeSlot(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:11090/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedTimeSlot,
          bookingDate,
          userId
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("Booking successful:", data);
    } catch (error) {
      console.error("Error while booking:", error);
    }
  };

  const filteredTimeSlots = timeSlots.filter((time) => time.trainingId == classType);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="classType">Class Type:</label>
      <select
        name="classType"
        value={classType}
        onChange={handleClassTypeChange}
      >
        <option value="">Select a class</option>
        {trainingPrograms.map((program) => (
          <option value={program.id}>
            {program.name}
          </option>
        ))}
      </select>
      <br></br>
      <label htmlFor="timeSlot">Time slot:</label>
      <select
        name="timeSlot"
        value={selectedTimeSlot}
        onChange={handleTimeSlotChange}
      >
        <option value="">Select a time slot</option>
        {filteredTimeSlots.map((time) => (
          <option value={time.id}>
            {time.startTime}
          </option>
        ))}
      </select>
      <br></br>
      <button type="submit">Book Class</button>
    </form>
  );
}

export default Booking;
