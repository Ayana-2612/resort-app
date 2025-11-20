// src/components/Footer.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";
function Footer() {
    const location = useLocation();
    const showBackButton = location.pathname === "/contact";

  return (
    <div style={{ backgroundColor: "#222", color: "white", textAlign: "center", padding: "20px", marginTop: "50px" }}>
      <p>Contact: contact@indriyaresort.com | +123 456 78900</p>
      <p>Follow us on 
        <a href="#" style={{color:"orange", margin:"0 5px"}}>Facebook</a>
        <a href="#" style={{color:"orange", margin:"0 5px"}}>Instagram</a>
      </p>
      <p>&copy; 2025 Indriya Resort</p>


        {showBackButton && (
        <Link to="/">
          <button className="back-btn"> Back </button>
        </Link>
      )}

    </div>
  );
}

export default Footer;
