// // backend/server.js
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { MongoClient } = require("mongodb");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const url = "mongodb://127.0.0.1:27017"; // Local MongoDB
// const dbName = "resortBooking";

// let db;

// async function startServer() {
//   try {
//     const client = await MongoClient.connect(url);
//     db = client.db(dbName);
//     console.log("✅ Connected to MongoDB");

//     // POST /bookings → Save booking
//     app.post("/bookings", async (req, res) => {
//       try {
//         const result = await db.collection("bookings").insertOne(req.body);
//         res.json({ message: "Booking saved!", id: result.insertedId });
//       } catch (err) {
//         res.status(500).json({ error: err.message });
//       }
//     });

//     // GET /bookings → Fetch all bookings
//     app.get("/bookings", async (req, res) => {
//       try {
//         const bookings = await db.collection("bookings").find().toArray();
//         res.json(bookings);
//       } catch (err) {
//         res.status(500).json({ error: err.message });
//       }
//     });

//     app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
//   } catch (err) {
//     console.error("❌ MongoDB connection failed", err);
//   }
// }

// startServer();


//new fields| upate : arrival date, departure date ,pax , validations-empty field and date logic
// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const url = "mongodb://127.0.0.1:27017"; // Local MongoDB
const dbName = "resortBooking";

let db;

async function startServer() {
  try {
    const client = await MongoClient.connect(url);
    db = client.db(dbName);
    console.log("✅ Connected to MongoDB");

    // POST /bookings → Save booking
    app.post("/bookings", async (req, res) => {
      try {
        const { name, email, arrivalDate, departureDate, pax } = req.body;

        // Validation: all fields required
        if (!name || !email || !arrivalDate || !departureDate || !pax) {
          return res.status(400).json({ message: "All fields are required" });
        }

        const today = new Date();
        const arrival = new Date(arrivalDate);
        const departure = new Date(departureDate);

        // Validation: arrival date cannot be in the past
        if (arrival < today.setHours(0, 0, 0, 0)) {
          return res.status(400).json({ message: "Arrival date cannot be in the past" });
        }

        // Validation: departure must be after arrival
        if (departure <= arrival) {
          return res.status(400).json({ message: "Departure date must be after arrival date" });
        }

        // Insert into MongoDB
        const result = await db.collection("bookings").insertOne({
          name,
          email,
          arrivalDate,
          departureDate,
          pax,
          createdAt: new Date()
        });

        res.json({ message: "Booking saved!", id: result.insertedId });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // GET /bookings → Fetch all bookings
    app.get("/bookings", async (req, res) => {
      try {
        const bookings = await db.collection("bookings").find().toArray();
        res.json(bookings);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
  }
}

startServer();