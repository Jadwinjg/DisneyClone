const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ CORS settings: allow requests from any origin
app.use(cors({
  origin: "*", // allow all origins (for public access)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true
}));

// ✅ Middleware
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api/user", userRoutes);

// ✅ Dynamic port binding for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
