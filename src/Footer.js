import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <Link to="/training" className="footer-link">
        Training
      </Link>
      <Link to="/fitness" className="footer-link">
        Fitness
      </Link>
      <Link to="/equipment" className="footer-link">
        Equipment
      </Link>
      {/* Add any other footer links here */}
    </footer>
  );
}

export default Footer;
