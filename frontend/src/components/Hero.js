import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero">
      <h1>Indriya Resort</h1>
      <p>Relax, Refresh, Rejuvenate</p>
      <a href="#booking">Book Now</a>
    </div>
  );
}

export default Hero;


// // src/components/Hero.js
// import React from "react";

// function Hero() {
//   return (
//     <div style={{
//       backgroundImage: "url('https://images.unsplash.com/photo-1668616796315-d9adbd1b26ec?q=80&w=653&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
//       backgroundSize: "cover",
//       color: "white",
//       padding: "100px 20px",
//       textAlign: "center"
//     }}>
//       <h1>Indriya Resort</h1>
//       <p>Relax, Refresh, Rejuvenate</p>
//       <a href="#booking" style={{
//         backgroundColor: "#ff9900",
//         padding: "10px 20px",
//         color: "white",
//         textDecoration: "none",
//         borderRadius: "5px"
//       }}>Book Now</a>
//     </div>
//   );
// }

// export default Hero;
