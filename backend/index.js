import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import path from 'path'
import { fileURLToPath } from 'url';
// Import socket server
import { app, server } from "./SocketIO/server.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Read environment variables
const PORT = process.env.PORT || 3001;
const URI = process.env.MONGO_URL;

// Check for missing Mongo URI
if (!URI) {
  console.error("❌ MONGO_URL is missing from the .env file!");
  process.exit(1); // Stop server
}

// Connect to MongoDB (cleaned: removed deprecated options)
mongoose
  .connect(URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop server on failure
  });

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server is Running on port ${PORT}`);
});
