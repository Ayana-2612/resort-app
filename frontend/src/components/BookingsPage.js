import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

  const fetchBookings = async () => {
    const res = await fetch("http://localhost:5000/bookings");
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    const res = await fetch(`http://localhost:5000/bookings/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchBookings(); // refresh frontend list
    } else {
      alert("Failed to delete booking.");
    }
  };

  return (
    <>
      <div style={{ textAlign: "right", marginTop: "40px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#e68a00",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: 600,
          }}
        >
          {" "}
          Back to Home{" "}
        </button>
      </div>
      <div style={{ textAlign: "center", margin: "50px 0" }}>
        <h2>All Bookings</h2>

        <table
          style={{ margin: "0 auto", borderCollapse: "collapse", width: "80%" }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Email
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Arrival
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Departure
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Pax</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {b.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {b.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {b.arrivalDate}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {b.departureDate}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {b.pax}
                </td>

                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => deleteBooking(b._id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BookingsPage;
