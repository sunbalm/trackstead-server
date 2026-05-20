const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const trackerRoutes = require("./routes/trackerRoutes");
const trackerEntryRoutes = require("./routes/trackerEntryRoutes");
const trackerResetRoutes = require("./routes/trackerResetRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000"
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Trackstead API is running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Trackstead"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/trackers", trackerRoutes);
app.use("/api/tracker-entries", trackerEntryRoutes);
app.use("/api/tracker-resets", trackerResetRoutes);
app.use("/api/contact", contactRoutes);

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Missing MONGODB_URI in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB Atlas");

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Trackstead server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start Trackstead server:", error.message);
    process.exit(1);
  }
}

startServer();