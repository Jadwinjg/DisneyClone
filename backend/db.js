const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres:Sairam@123@db.lumnkjtivtfouwbwrxun.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

pool.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("DB connection error:", err));

module.exports = pool;
