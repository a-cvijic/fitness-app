import React, { useState } from "react";

function Booking() {
  const [classType, setClassType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would usually send the data to the server
    console.log({ classType });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="classType">Class Type:</label>
      <select
        name="classType"
        value={classType}
        onChange={(e) => setClassType(e.target.value)}
        required
      >
        <option value="">Select a class</option>
        <option value="yoga">Yoga</option>
        <option value="spinning">Spinning</option>
        <option value="pilates">Pilates</option>
      </select>
      <button type="submit">Book Class</button>
    </form>
  );
}

export default Booking;
