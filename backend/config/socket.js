const WebSocket = require("ws");
const { pool } = require("./db");

const setupWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", async (message) => {
      const { x, y, color } = JSON.parse(message);

      try {
        const connection = await pool.getConnection();
        await connection.query(
          "INSERT INTO pixels (x_coord, y_coord, color) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE color = ?",
          [x, y, color, color]
        );
      } catch (error) {
        console.error("Error handling message:", error);
      }

      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = { setupWebSocketServer };
