const express = require("express");
const http = require("http");
const path = require("path");
const { setupWebSocketServer } = require("./config/socket");

const app = express();
const server = http.createServer(app);

// Setup WebSocket
const wss = setupWebSocketServer(server);

// Servir les fichiers statiques du frontend
const frontendPath = path.resolve(__dirname, "../frontend");
app.use(express.static(frontendPath));

// Lancer le serveur HTTP/Express
server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

const pixelsRoutes = require("./routes/pixels");
app.use("/api", pixelsRoutes);
