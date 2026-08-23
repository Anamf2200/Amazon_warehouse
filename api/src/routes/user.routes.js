const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

const { protect } = require("../middlrware/auth.middleware");

const router = express.Router();

// Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Users
router.get("/me", protect, getCurrentUser);
router.get("/", protect, getAllUsers);
router.get("/:id", protect, getUserById);
router.put("/", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;