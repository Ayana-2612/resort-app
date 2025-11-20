import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero">
     
      <h1>Indriya Resort</h1>
      <p>Relax, Refresh, Rejuvenate</p>

      {/* Book Now  */}
      <a className="orange-btn" href="#booking">Book Now</a>

      {/* Contact Us — Top Right */}
      <div className="hero-top-right">
        <Link to="/contact">
          <button className="orange-btn">Contact Us</button>
        </Link>
      </div>
      
    </div>
  );
}

export default Hero;