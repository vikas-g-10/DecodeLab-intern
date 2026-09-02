require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./middleware/authMiddleware");
const requireRole = require("./middleware/requireRole");

const prisma = require("./lib/prisma");

const app = express();

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "DecodeLabs Project 3 - Secure Authentication API",
  });
});

// Register a new user
app.post("/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Check whether the email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "User with this email already exists",
      });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Save user with the hashed password
    const user = await prisma.user.create({
      data: {
        email,
        password_hash: passwordHash,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Login
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Compare the supplied password with the stored hash
    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Protected route
app.get("/protected", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        email: true,
        created_at: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      message: "You accessed a protected route",
      user,
    });
  } catch (error) {
    console.error("Protected route error:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Admin-only route
app.get(
  "/admin",
  authenticateToken,
  requireRole("ADMIN"),
  async (req, res) => {
    res.json({
      message: "Welcome, Admin",
      user: req.user,
    });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});