const canvas = document.getElementById("pixel-grid");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("color-picker");
const gridWidth = 100;
const gridHeight = 70;
const pixelSize = 10;

// WebSocket
const socket = new WebSocket("ws://localhost:3000"); // Ajustez l'URL si nécessaire

socket.addEventListener("message", (event) => {
  console.log("WebSocket message:", event.data); // Ajoutez ce log
  const { x, y, color } = JSON.parse(event.data);
  colorPixel(x, y, color);
});

// Fonction pour colorer un pixel spécifique
const colorPixel = (x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
};

let isClickEnabled = true;

// Ecoute des clics sur le canvas
canvas.addEventListener("click", (e) => {
  if (!isClickEnabled) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = Math.floor(((e.clientX - rect.left) * scaleX) / pixelSize);
  const y = Math.floor(((e.clientY - rect.top) * scaleY) / pixelSize);

  colorPixel(x, y, colorPicker.value);
  socket.send(JSON.stringify({ x, y, color: colorPicker.value }));
});

// Ecoute des clics sur le bouton "Appliquer" pour colorer un pixel manuellement
document.getElementById("apply-color").addEventListener("click", () => {
  const xCoordInput = document.getElementById("x-coord");
  const yCoordInput = document.getElementById("y-coord");

  const x = parseInt(xCoordInput.value, 10);
  const y = parseInt(yCoordInput.value, 10);

  if (!isNaN(x) && !isNaN(y) && x < gridWidth && y < gridHeight) {
    colorPixel(x, y, colorPicker.value);
    socket.send(JSON.stringify({ x, y, color: colorPicker.value }));
  } else {
    alert("Veuillez entrer des coordonnées valides.");
  }
});

const inputMethodSelect = document.getElementById("input-method");
const coordinateInputs = document.getElementById("coordinate-inputs");

// Ecoute des changements sur le sélecteur de méthode d'entrée
inputMethodSelect.addEventListener("change", () => {
  const isManual = inputMethodSelect.value === "manual";
  coordinateInputs.style.display = isManual ? "block" : "none";
  isClickEnabled = !isManual;
});

// Affiche les coordonnées du tableau du pixel survolé
const hoverInfo = document.createElement("div");
hoverInfo.setAttribute("id", "hover-info");
document.body.appendChild(hoverInfo);

// Ecoute des mouvements de souris sur le canvas
canvas.addEventListener("mousemove", (e) => {
  if (inputMethodSelect.value === "manual") {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor(((e.clientX - rect.left) * scaleX) / pixelSize);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / pixelSize);

    hoverInfo.style.display = "block";
    hoverInfo.style.left = e.clientX + "px";
    hoverInfo.style.top = e.clientY + "px";
    hoverInfo.textContent = `X: ${x}, Y: ${y}`;
  } else {
    hoverInfo.style.display = "none";
  }
});

const fetchPixelsAndDraw = async () => {
  try {
    // Envoie une requête GET pour obtenir les données des pixels depuis le serveur
    const response = await fetch("http://localhost:3000/api/pixels");

    // Vérifiez que la réponse est OK (status 200-299)
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    // Convertit la réponse en JSON
    const pixels = await response.json();

    // Vérifie que 'pixels' est un tableau avant de l'utiliser avec forEach
    if (Array.isArray(pixels)) {
      // Utilise chaque objet pixel pour dessiner un pixel sur le canvas
      pixels.forEach((pixel) => {
        console.log("Drawing pixel at load:", pixel); // Ajoutez ce log
        colorPixel(pixel.x_coord, pixel.y_coord, pixel.color);
      });
    } else {
      console.error(
        "Expected an array of pixels, but did not receive one:",
        pixels
      );
    }
  } catch (error) {
    // Affiche une erreur dans la console si une erreur se produit
    console.error("Error fetching pixels:", error);
  }
};

// Appelle la fonction au chargement de la page pour dessiner les pixels existants
fetchPixelsAndDraw();
