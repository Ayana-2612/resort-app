// // src/components/BookingForm.js
// import { useState, useEffect } from "react";

// function BookingForm() {
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
//     <div id="booking" style={{ textAlign: "center", margin: "50px 0" }}>
//       <h2>Book Your Stay</h2>
//       <form onSubmit={handleSubmit} style={{ display: "inline-block", marginBottom: "30px" }}>
//         <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required style={{ margin:"5px", padding:"5px" }}/>
//         <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ margin:"5px", padding:"5px" }}/>
//         <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={{ margin:"5px", padding:"5px" }}/>
//         <button type="submit" style={{ margin:"5px", padding:"5px 10px", backgroundColor:"#ff9900", color:"white", border:"none", borderRadius:"5px" }}>Book Now</button>
//       </form>

//       <h3>All Bookings</h3>
//       <ul>
//         {bookings.map(b => (
//           <li key={b._id}>{b.name} - {b.email} - {b.date}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default BookingForm;


//new fields - 
// src/components/BookingForm.js
import { useState, useEffect } from "react";

function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [pax, setPax] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    const res = await fetch("http://localhost:5000/bookings");
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, arrivalDate, departureDate, pax }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Something went wrong!");
    } else {
      setName("");
      setEmail("");
      setArrivalDate("");
      setDepartureDate("");
      setPax(1);
      fetchBookings();
    }
  };

  const today = new Date().toISOString().split("T")[0]; // for min attribute

  return (
    <div id="booking" style={{ textAlign: "center", margin: "50px 0" }}>
      <h2>Book Your Stay</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", marginBottom: "30px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ margin: "5px", padding: "5px" }}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ margin: "5px", padding: "5px" }}
        />
        <input
          type="date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          min={today}
          required
          style={{ margin: "5px", padding: "5px" }}
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          min={arrivalDate || today} // departure must be same or after arrival
          required
          style={{ margin: "5px", padding: "5px" }}
        />
        <input
          type="number"
          min="1"
          value={pax}
          onChange={(e) => setPax(e.target.value)}
          required
          placeholder="Number of Guests"
          style={{ margin: "5px", padding: "5px" }}
        />
        <button
          type="submit"
          style={{
            margin: "5px",
            padding: "5px 10px",
            backgroundColor: "#ff9900",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Book Now
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      
      {/* <h3>All Bookings</h3>
      <ul>
        {bookings.map((b) => (
          <li key={b._id}>
            {b.name} - {b.email} - From {b.arrivalDate} to {b.departureDate} - Pax: {b.pax}
          </li>
        ))}
      </ul> */}

      {/* Table View */}
      <h3>All Bookings</h3>
<table style={{ margin: "0 auto", borderCollapse: "collapse", width: "80%" }}>
  <thead>
    <tr>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Arrival</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Departure</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Pax</th>
    </tr>
  </thead>
  <tbody>
    {bookings.map((b) => (
      <tr key={b._id}>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{b.name}</td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{b.email}</td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{b.arrivalDate}</td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{b.departureDate}</td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{b.pax}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default BookingForm;
