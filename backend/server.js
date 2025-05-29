const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api", authRoutes);
app.use("/api", uploadRoutes); 
app.use('/api/user', userRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
