const db = require("../db");  // your pg Pool instance
const bcrypt = require("bcryptjs");

// Register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const checkQuery = "SELECT * FROM users WHERE email = $1";
    const checkResult = await db.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
    await db.query(insertQuery, [name, email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ message: "Database error" });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkQuery = "SELECT * FROM users WHERE email = $1";
    const result = await db.query(checkQuery, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Database error" });
  }
};

module.exports = { registerUser, loginUser };
