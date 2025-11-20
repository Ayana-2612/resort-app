//without deployment changes
//new fields| upate : arrival date, departure date ,pax , validations-empty field and date logic
// // backend/server.js
// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Setup
const url = "mongodb://127.0.0.1:27017";
const dbName = "resortBooking";
let db;

async function startServer() {
  try {
    const client = await MongoClient.connect(url);
    db = client.db(dbName);
    console.log("Connected to MongoDB ✔");

    // POST /bookings - Add booking with duplicate prevention
    app.post("/bookings", async (req, res) => {
      try {
        const { name, email, arrivalDate, departureDate, pax } = req.body;

        // Required fields check
        if (!name || !email || !arrivalDate || !departureDate || !pax) {
          return res.status(400).json({ message: "All fields are required" });
        }

        // Convert to Date objects
        const arrival = new Date(arrivalDate);
        const departure = new Date(departureDate);

        const arrivalISO = arrival.toISOString();
        const departureISO = departure.toISOString();

        // Normalize today's date (remove time)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Date validation
        if (arrival < today) {
          return res.status(400).json({ message: "Arrival date cannot be in the past" });
        }
        if (departure <= arrival) {
          return res.status(400).json({ message: "Departure date must be after arrival date" });
        }

        // Prevent duplicate bookings for same guest + overlapping dates
        const existingBooking = await db.collection("bookings").findOne({
          email,
              arrivalDate: { $lte: departureISO }, // arrival ≤ new departure
              departureDate: { $gte: arrivalISO }  // departure ≥ new arrival
        });

        if (existingBooking) {
          return res.status(400).json({
            message: "You already have a booking during these dates!"
          });
        }

        // Insert new booking
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
        res.status(500).json({ message: "Server error", error: err.message });
      }
    });

    // GET /bookings - Fetch all bookings
    app.get("/bookings", async (req, res) => {
      try {
        const bookings = await db.collection("bookings").find().toArray();
        res.json(bookings);
      } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
      }
    });

    //DELETE  /bookings/:id - Delete booking by ID 
    app.delete("/bookings/:id", async (req, res) => {
      try {
        const { ObjectId } = require("mongodb");
        const id = req.params.id;

        const result = await db.collection("bookings").deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking deleted" });
      } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
      }
    });


    app.listen(5000, () => console.log("Server running at http://localhost:5000 ✔"));

  } catch (err) {
    console.error("MongoDB connection failed ", err);
  }
}

startServer();




//duplicate validation notimplemented 
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { MongoClient } = require("mongodb");

// //create express app
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// //mongo connection setup
// const url = "mongodb://127.0.0.1:27017"; // Local MongoDB
// const dbName = "resortBooking"; // Local MongoDB
// let db;

// async function startServer() {
//   try {
//     //Start the server and connect to MongoDB
//     const client = await MongoClient.connect(url);
//     db = client.db(dbName);  // Local MongoDB
//     console.log("Connected to MongoDB");

//     // POST /bookings → Add and Save booking
//     app.post("/bookings", async (req, res) => {
//       try {
//         const { name, email, arrivalDate, departureDate, pax } = req.body;

//         // Validation: all fields required
//         if (!name || !email || !arrivalDate || !departureDate || !pax) {
//           return res.status(400).json({ message: "All fields are required" });
//         }
//         //Convert dates to JavaScript Date objects for comparison
//         const today = new Date();
//         const arrival = new Date(arrivalDate);
//         const departure = new Date(departureDate);

//         // Validation: arrival date cannot be in the past
//         if (arrival < today.setHours(0, 0, 0, 0)) {
//           return res.status(400).json({ message: "Arrival date cannot be in the past" });
//         }

//         // Validation: departure must be after arrival
//         if (departure <= arrival) {
//           return res.status(400).json({ message: "Departure date must be after arrival date" });
//         }

//         // Insert into MongoDB, mongoDB autocreates _id field
//         const result = await db.collection("bookings").insertOne({
//           name,
//           email,
//           arrivalDate,
//           departureDate,
//           pax,
//           createdAt: new Date()
//         });

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

//     app.listen(5000, () => console.log("Server running on http://localhost:5000")); //Local Mongodb
//   } catch (err) {
//     console.error("MongoDB connection failed", err);
//   }
// }

// startServer();


// =====================================================================================================
//with deployment changes
//new fields| upate : arrival date, departure date ,pax , validations-empty field and date logic
// backend/server.js
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { MongoClient } = require("mongodb");

// const app = express();

// // app.use(cors()); //loacal
// app.use(
//   cors({
//     origin: "https://resort-app-zeta.vercel.app", // my Vercel domain
//     methods: ["GET", "POST"],
//   })
// );

// app.use(bodyParser.json());

// // const url = "mongodb://127.0.0.1:27017"; // Local MongoDB
// const url = process.env.MONGO_URI;  //  Instead of local mongodb - MongoDB Atlas

// // const dbName = "resortBooking"; // Local MongoDB

// let db;

// async function startServer() {
//   try {
//     const client = await MongoClient.connect(url);
//     // db = client.db(dbName);  // Local MongoDB
//      db = client.db(); //Instead of local mongodb - MongoDB Atlas Automatically selects DB from URI
//     console.log("✅ Connected to MongoDB");


//     // POST /bookings → Save booking
//     app.post("/bookings", async (req, res) => {
//       try {
//         const { name, email, arrivalDate, departureDate, pax } = req.body;

//         // Validation: all fields required
//         if (!name || !email || !arrivalDate || !departureDate || !pax) {
//           return res.status(400).json({ message: "All fields are required" });
//         }

//         const today = new Date();
//         const arrival = new Date(arrivalDate);
//         const departure = new Date(departureDate);

//         // Validation: arrival date cannot be in the past
//         if (arrival < today.setHours(0, 0, 0, 0)) {
//           return res.status(400).json({ message: "Arrival date cannot be in the past" });
//         }

//         // Validation: departure must be after arrival
//         if (departure <= arrival) {
//           return res.status(400).json({ message: "Departure date must be after arrival date" });
//         }

//         // Insert into MongoDB
//         const result = await db.collection("bookings").insertOne({
//           name,
//           email,
//           arrivalDate,
//           departureDate,
//           pax,
//           createdAt: new Date()
//         });

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

//     // app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000")); //Local Mongodb

//     //health check endpoint
// app.get("/health", (req, res) => {
//   res.json({ status: "OK", message: "Backend running" });
// });
//     //instead - for RENDER on dynamic port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));  


//   } catch (err) {
//     console.error("❌ MongoDB connection failed", err);
//   }
// }

// startServer();