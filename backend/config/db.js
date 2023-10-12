const mariadb = require("mariadb");
const path = require("path");
const envPath = path.resolve(__dirname, "../../.env");

require("dotenv").config({ path: envPath });

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Test de connexion à la base de données
async function testDbConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Connected to the database!");
    let rows = await conn.query("DESCRIBE pixels");
    console.log("Database connection test successful!");
    console.log(rows);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    if (conn) conn.release(); // Libérer la connexion lorsqu'elle n'est plus nécessaire
  }
}

module.exports = {
  pool,
  testDbConnection,
};

// testDbConnection();
