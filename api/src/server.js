
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { sequelize, connectDB } = require("./config/db");
const userRoutes = require("../src/routes/user.routes")

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Amazon Warehouse API is running",
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await sequelize.sync();

    console.log("Database synchronized");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
  }
};

startServer();