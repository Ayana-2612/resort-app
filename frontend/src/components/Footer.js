// src/components/Footer.js
import React from "react";

function Footer() {
  return (
    <div style={{ backgroundColor: "#222", color: "white", textAlign: "center", padding: "20px", marginTop: "50px" }}>
      <p>Contact: contact@indriyaresort.com | +123 456 78900</p>
      <p>Follow us on 
        <a href="#" style={{color:"orange", margin:"0 5px"}}>Facebook</a>
        <a href="#" style={{color:"orange", margin:"0 5px"}}>Instagram</a>
      </p>
      <p>&copy; 2025 Indriya Resort</p>
    </div>
  );
}

export default Footer;
