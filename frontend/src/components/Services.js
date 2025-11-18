// src/components/Services.js
import React from "react";

function Services() {
  return (
    <>
     <h2>Services</h2> <br/>
    <div style={{ display: "flex", justifyContent: "space-around", margin: "50px 0" }}> 
   
      <div style={{ textAlign: "center" }}>
        <a href="#booking">
        <img src="https://img.icons8.com/ios-filled/100/000000/bed.png" alt="Accommodation"/>
         </a>
        <h3>Accommodation</h3>
       
      </div>
      <div style={{ textAlign: "center" }}>
          <a href="#booking">
        <img src=" https://img.icons8.com/?size=100&id=9844&format=png&color=000000" alt="Adventure"/>
        </a>
        <h3>Adventure Activities</h3>
      </div>
      <div style={{ textAlign: "center" }}>
        <a href="#booking">
        <img src="https://img.icons8.com/ios-filled/100/000000/spa.png" alt="Wellness"/>
        </a>
        <h3>Wellness & Spa</h3>
      </div>
    </div>
    </>
  );
}

export default Services;
