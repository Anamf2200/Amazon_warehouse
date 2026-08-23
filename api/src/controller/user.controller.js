const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/user.model");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

// REGISTER
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      succeeded: false,
      message: "Name, email and password are required",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      succeeded: false,
      message: "Password must be at least 8 characters",
    });
  }

  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({
      succeeded: false,
      message: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "employee",
  });

  res.status(201).json({
    succeeded: true,
    message: "User registered successfully",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// LOGIN
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      succeeded: false,
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({
      succeeded: false,
      message: "Invalid email or password",
    });
  }

  if (user.status !== "active") {
    return res.status(403).json({
      succeeded: false,
      message: "Your account is inactive",
    });
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(401).json({
      succeeded: false,
      message: "Invalid email or password",
    });
  }

  const token = generateToken(user);

  res.status(200).json({
    succeeded: true,
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      token,
    },
  });
});

// LOGOUT
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    succeeded: true,
    message: "Logout successful",
  });
});

// GET CURRENT USER
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: {
      exclude: ["password"],
    },
  });

  if (!user) {
    return res.status(404).json({
      succeeded: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    succeeded: true,
    data: user,
  });
});

// GET ALL USERS
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
    order: [["id", "ASC"]],
  });

  res.status(200).json({
    succeeded: true,
    data: users,
  });
});

// GET USER BY ID
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: {
      exclude: ["password"],
    },
  });

  if (!user) {
    return res.status(404).json({
      succeeded: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    succeeded: true,
    data: user,
  });
});

// UPDATE USER
const updateUser = asyncHandler(async (req, res) => {
  const {
    id,
    name,
    email,
    password,
    role,
    status,
  } = req.body;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      succeeded: false,
      message: "User not found",
    });
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = password;
  if (role) user.role = role;
  if (status) user.status = status;

  await user.save();

  res.status(200).json({
    succeeded: true,
    message: "User updated successfully",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
});

// DELETE USER
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({
      succeeded: false,
      message: "User not found",
    });
  }

  await user.destroy();

  res.status(200).json({
    succeeded: true,
    message: "User deleted successfully",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};