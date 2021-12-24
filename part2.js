const canvas = document.getElementById("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const context = canvas.getContext("2d");

// Eraser
const erase = () => (context.globalCompositeOperation = "destination-out");

// Reset canvas
const resetCanvas = () => context.clearRect(0, 0, canvas.width, canvas.height);

// Change colors
const changeColor = color => {
  context.strokeStyle = color;
  context.globalCompositeOperation = "source-over";
};

// Change line width
context.lineWidth = 2;
const changeWidth = value => (context.lineWidth = value);

// Draw logic
let isDrawing = false;

const startDrawing = event => {
  isDrawing = true;
  context.beginPath();
  context.moveTo(event.clientX, event.clientY);
};
const stopDrawing = () => {
  isDrawing = false;
};
const draw = event => {
  if (!isDrawing) return;
  context.lineTo(event.clientX, event.clientY);
  context.stroke();
};
const enterCanvas = event => {
  context.beginPath();
};

window.addEventListener("mousedown", startDrawing);
window.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseover", enterCanvas);
