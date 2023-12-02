import React from "react";
import "./Account.css";

// Mock user data
const userInfo = {
  username: "johndoe",
  email: "john.doe@example.com",
  membership: "Gold Member", // etc
};

function Account() {
  // Display user information
  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <strong>Username:</strong> {userInfo.username}
      </p>
      <p>
        <strong>Email:</strong> {userInfo.email}
      </p>
      <p>
        <strong>Membership Level:</strong> {userInfo.membership}
      </p>
      {/* Add more user details here */}
    </div>
  );
}

export default Account;
