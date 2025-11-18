//component based approach
//src/App.js
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Hero />
      <Services />
      <Gallery />
      <BookingForm />
      <Footer />
    </div>
  );
}

export default App;



// =========================================
//Booking form
// import { useState, useEffect } from "react";

// function App() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [date, setDate] = useState("");
//   const [bookings, setBookings] = useState([]);

//   const fetchBookings = async () => {
//     const res = await fetch("http://localhost:5000/bookings");
//     const data = await res.json();
//     setBookings(data);
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await fetch("http://localhost:5000/bookings", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, date }),
//     });
//     setName(""); setEmail(""); setDate("");
//     fetchBookings();
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Resort Booking</h1>
//       <form onSubmit={handleSubmit}>
//         <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
//         <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
//         <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
//         <button type="submit">Book Now</button>
//       </form>

//       <h2>All Bookings</h2>
//       <ul>
//         {bookings.map(b => (
//           <li key={b._id}>{b.name} - {b.email} - {b.date}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

