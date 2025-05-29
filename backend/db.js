const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres.lumnkjtivtfouwbwrxun:Sairam%40123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  ssl: { rejectUnauthorized: false },
});

pool.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("DB connection error:", err));

module.exports = pool;
