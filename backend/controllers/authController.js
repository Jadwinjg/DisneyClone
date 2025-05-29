 const db = require("../db");
const bcrypt = require("bcryptjs");

// Register
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const insertQuery = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
    db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: "Insert failed" });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

// Login
const loginUser = (req, res) => {
  const { email, password } = req.body;

  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
};

module.exports = { registerUser, loginUser };
