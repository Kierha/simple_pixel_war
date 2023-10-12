// Dans backend/routes/pixels.js
const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

router.get("/pixels", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const rows = await connection.query("SELECT * FROM pixels");

    // Log des données pour le débug
    console.log("Data:", rows);

    // Vérification que les données sont un tableau
    if (!Array.isArray(rows)) {
      console.error("DB did not return an array:", rows);
      return res.status(500).send("Server error: Data format unexpected");
    }

    res.json(rows);
  } catch (error) {
    // Log de l'erreur pour le débug
    console.error("Error fetching data:", error);
    res.status(500).send("Server error");
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

router.post("/pixel", async (req, res) => {
  let connection;
  try {
    const { x, y, color } = req.body;
    connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO pixels (x_coord, y_coord, color) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE color = ?",
      [x, y, color, color]
    );
    res.status(200).send("Pixel updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
