import React, { useState, useEffect } from 'react';

function FitnessUsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/fitness_users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <table className="fitness-users">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Date Of Birth</th>
          <th>Gender</th>
          <th>Membership</th>
        </tr>
      </thead>
      <tbody>
  {users.map((users, index) => (
    <tr key={index}>
      <td>{users._id}</td>
      <td>{users.name}</td>
      <td>{users.date_of_birth}</td>
      <td>{users.gender}</td>
      <td>{users.membership}</td>
    </tr>
  ))}
</tbody>
    </table>
  );
}

export default FitnessUsersTable;
