import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Training.css";

const Training = () => {
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({
    trainingID: "",
    name: "",
    duration: "",
    description: "",
  });

  useEffect(() => {
    fetchTrainingPrograms();
  }, []);

  const fetchTrainingPrograms = () => {
    fetch("http://studentdocker.informatika.uni-mb.si:11094/api/training")
      .then((response) => {
        if (!response.ok) {
          toast.error("Failed to fetch training programs.");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTrainingPrograms(data);
        toast.success("Training programs fetched successfully.");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deleteTrainingProgram = (trainingID) => {
    const token = localStorage.getItem("token"); // Get the JWT token from localStorage

    fetch(
      `http://studentdocker.informatika.uni-mb.si:11094/api/training/${trainingID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          toast.error(
            "Unauthorized: Please log in to delete training programs."
          );
          return;
        } else if (!response.ok) {
          toast.error("Failed to delete training program.");
          throw new Error("Network response was not ok");
        }
        fetchTrainingPrograms(); // Re-fetch the training programs after deletion
        toast.success("Training program deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting training program:", error);
        toast.error("An error occurred while deleting the training program.");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProgram((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createTrainingProgram = () => {
    const trainingID = parseInt(newProgram.trainingID);
    if (isNaN(trainingID)) {
      toast.error("Training ID must be a number.");
      return;
    }
    if (trainingPrograms.some((program) => program.trainingID === trainingID)) {
      toast.error("Training ID is already taken.");
      return;
    }

    const token = localStorage.getItem("token");
    fetch("http://studentdocker.informatika.uni-mb.si:11094/api/training", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...newProgram, trainingID }),
    })
      .then((response) => {
        if (response.status === 401) {
          toast.error(
            "Unauthorized: Please log in to create training programs."
          );
          return;
        } else if (!response.ok) {
          toast.error("Failed to create training program.");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        fetchTrainingPrograms(); // Re-fetch the training programs after creation
        setNewProgram({
          // Reset the form
          trainingID: "",
          name: "",
          duration: "",
          description: "",
        });
        toast.success("Training program created successfully.");
      })
      .catch((error) => {
        console.error("Error creating training program:", error);
        toast.error("An error occurred while creating the training program.");
      });
  };

  return (
    <div className="training-container">
      <h2>Training Programs</h2>
      <div className="create-training-form">
        <input
          type="number"
          name="trainingID"
          value={newProgram.trainingID}
          onChange={handleInputChange}
          placeholder="Training ID"
        />
        <input
          type="text"
          name="name"
          value={newProgram.name}
          onChange={handleInputChange}
          placeholder="Program Name"
        />
        <input
          type="text"
          name="duration"
          value={newProgram.duration}
          onChange={handleInputChange}
          placeholder="Duration"
        />
        <input
          type="text"
          name="description"
          value={newProgram.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <button onClick={createTrainingProgram}>Wish a Training</button>
      </div>
      {trainingPrograms.map((program) => (
        <div key={program.trainingID} className="training-item">
          <h3 className="training-title">{program.name}</h3>
          <p className="training-duration">
            Duration: {program.duration} minutes
          </p>
          <p className="training-description">
            Description: {program.description}
          </p>
          <button onClick={() => deleteTrainingProgram(program.trainingID)}>
            Delete
          </button>
        </div>
      ))}
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default Training;
