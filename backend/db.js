const { Pool } = require("pg");

// Correctly encode special characters in the password ('@' becomes '%40')
const pool = new Pool({
  connectionString: "postgresql://postgres:Sairam%40123@db.lumnkjtivtfouwbwrxun.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

pool.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("DB connection error:", err));

module.exports = pool;
