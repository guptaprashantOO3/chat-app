import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";

// Import socket server
import { app, server } from "./SocketIO/server.js";

// Load env variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Read variables
const PORT = process.env.PORT || 3001;
const URI = process.env.MONGO_URI;

// MongoDB connection
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server is Running on port ${PORT}`);
});
