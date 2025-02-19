const express = require("express");
const bodyParser = require("body-parser");
const infoRoutes = require("./routes/infoRoute");
const projectRoutes = require("./routes/projectRoute");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//MongoDB connecting
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://khantthihazaw2018:Bh7AMbvtBE6FdFFg@cluster0.m1pgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("mongodb connected");
  } catch (err) {
    console.error("MongoDB connection failed", err.message);
  }
};

connectDB();
//CORS middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

//routes
app.use("/api/info", infoRoutes);
app.use("/api/project", projectRoutes);

// Test route
app.get("/", (req, res) => {
  res.status(200).send("API is running.");
});
//Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Internal server error" });
});

//Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
