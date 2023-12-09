import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(mail, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Mail:</label>
        <input
          type="text"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
