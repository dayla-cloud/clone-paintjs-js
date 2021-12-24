const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const startColor = "#000000";

const eraser = () => (ctx.globalCompositeOperation = "destination-out");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
// const resetCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = startColor;
ctx.fillStyle = startColor;

ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = "5";
ctx.lineWidth = "5";

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColor(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.globalCompositeOperation = "source-over";
}

function handleRange(e) {
  const strokeSize = e.target.value;
  ctx.lineWidth = strokeSize;
}

function handleMode(e) {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "PAINT";
  }
}

function handleCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function filled() {
  const filledBg = canvas.style.backgroundColor;
}

function handleCM(e) {
  e.preventDefault();
}

function saveImg() {
  const img = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = img;
  link.download = "paintjs[export]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvas);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(pallete =>
  pallete.addEventListener("click", handleColor)
);

if (range) {
  range.addEventListener("input", handleRange);
}

if (mode) {
  mode.addEventListener("click", handleMode);
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveImg);
}
