// src/components/Gallery.js
import "./Gallery.css";

function Gallery() {
  const images = [
    "https://img.icons8.com/?size=100&id=gFqg6pmQEBMr&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=Tu3NNYj4NYEy&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=866Q7Bn5vzY8&format=png&color=000000",
  ];

  return (
    <div className="gallery-container">
      {images.map((img, i) => (
        <a href="#booking" key={i}>
          <img src={img} alt={`resort ${i + 1}`} className="gallery-img" />
        </a>
      ))}
    </div>
  );
}

export default Gallery;


// // src/components/Gallery.js
// import React from "react";

// function Gallery() {
//   const images = [
//     "https://img.icons8.com/?size=100&id=gFqg6pmQEBMr&format=png&color=000000",
//     "https://img.icons8.com/?size=100&id=Tu3NNYj4NYEy&format=png&color=000000",
//     "https://img.icons8.com/?size=100&id=866Q7Bn5vzY8&format=png&color=000000",
//   ];


//   return (
//     <div style={{ display: "flex", justifyContent: "space-around", margin: "50px 0" }}>
//       {images.map((img, i) => (
//         <a href="#booking">
//         <img key={i} src={img} alt={`resort ${i+1}`} style={{ borderRadius: "10px" }}/>
//         </a>
//       ))}
//     </div>
//   );
// }

// export default Gallery;
