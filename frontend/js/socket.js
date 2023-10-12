const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", (event) => {
  console.log("Connected to the WS server");
});

socket.addEventListener("message", (event) => {
  const { x, y, color } = JSON.parse(event.data);
  colorPixel(x, y, color);
});

// Envoyer une mise à jour de pixel au serveur
const sendPixelUpdate = (x, y, color) => {
  const pixelData = { x, y, color };
  socket.send(JSON.stringify(pixelData));
};

document.getElementById("apply-color").addEventListener("click", () => {
  const xCoordInput = document.getElementById("x-coord");
  const yCoordInput = document.getElementById("y-coord");

  const x = parseInt(xCoordInput.value, 10);
  const y = parseInt(yCoordInput.value, 10);

  if (!isNaN(x) && !isNaN(y)) {
    const color = document.getElementById("color-picker").value;
    colorPixel(x, y, color); // dessine le pixel sur le canvas
    sendPixelUpdate(x, y, color); // envoie l'info au serveur via WebSocket
  } else {
    alert("Veuillez entrer des coordonnées valides.");
  }
});

document.getElementById("pixel-grid").addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = Math.floor(((e.clientX - rect.left) * scaleX) / pixelSize);
  const y = Math.floor(((e.clientY - rect.top) * scaleY) / pixelSize);
  const color = document.getElementById("color-picker").value;

  colorPixel(x, y, color); // dessine le pixel sur le canvas
  sendPixelUpdate(x, y, color); // envoie l'info au serveur via WebSocket
});
