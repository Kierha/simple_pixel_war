const WebSocket = require("ws");
const { pool } = require("./db");

// Setup WebSocket
const setupWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server });

  // Ecoute les connexions au serveur WebSocket
  wss.on("connection", (ws) => {
    console.log("Client connected");

    // Ecoute les messages envoyés par les clients
    ws.on("message", async (message) => {
      const { x, y, color } = JSON.parse(message);

      try {
        const connection = await pool.getConnection();
        // Exécution de la requête SQL pour insérer ou mettre à jour le pixel en base de données
        await connection.query(
          "INSERT INTO pixels (x_coord, y_coord, color) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE color = ?",
          [x, y, color, color]
        );
      } catch (error) {
        console.error("Error handling message:", error);
      }

      //   Boucle à travers tous les clients connectés et envoie le message à chacun
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    // Ecoute des fermeture de connexion
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = { setupWebSocketServer };
