import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Booking from "./Booking";
import Account from "./Account";
import Fitness from "./Fitness";
import Training from "./Training";
import Equipment from "./Equipment";
import Login from "./Login";
import Footer from "./Footer";
import Register from "./Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <nav>
        <Link to="/booking" className="nav-link">
          Booking
        </Link>
        <Link to="/account" className="nav-link">
          Account
        </Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="nav-link">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
            </>
            )}
            </nav>
      <div className="App">
        <Routes>
          <Route path="/booking" element={<Booking />} />
          <Route path="/account" element={<Account />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {/* Routes for Training and Equipment would likely still exist, they're just not in the top nav */}
          <Route path="/training" element={<Training />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      {/* Include the Footer at the bottom of your app */}
      <Footer />
    </Router>
  );
}

export default App;
