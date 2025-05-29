const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",           
  user: "store_test",       
  password: "Sairam@123",   
  database: "cinehubdb"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed!", err.message);
  } else {
    console.log("Database connected");
  }
});

module.exports = db;
