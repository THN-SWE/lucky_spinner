//radians = (Math.PI/180)*degrees.
// arc(x, y, radius, startAngle, endAngle, counterclockwise)
//arcTo(x1, y1, x2, y2, radius)
// const wheel = document.getElementById("wheel");

// const wheel_ctx = wheel.getContext("2d");

// wheel_ctx.beginPath();
// wheel_ctx.moveTo(750, 50);
// wheel_ctx.arcTo(100, 75, );
// wheel_ctx.lineTo(100, 10);
// wheel_ctx.fill();

// wheel_ctx.arc(180, 140, 100, 0,  Math.PI , true);
// wheel_ctx.fill()
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height=window.innerHeight;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 200;
const numSegments = 8;

const segmentColors = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
];
const segmentNames = [
  "Prize 1",
  "Prize 2",
  "Prize 3",
  "Prize 4",
  "Prize 5",
  "Prize 6",
  "Prize 7",
  "Prize 8",
];

let rotationAngle = 0;
let rotation_speed = 0.52;
const rotation_deceleration = 0.001;

let isSpinning = false;
const spin_button = document.getElementById("spin");

function drawWheel() {
  console.log(rotationAngle);
  const segmentAngle = (2 * Math.PI) / numSegments;

  for (let i = 0; i < numSegments; i++) {
    const startAngle = i * segmentAngle + rotationAngle;
    const endAngle = (i + 1) * segmentAngle + rotationAngle;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = segmentColors[i];
    ctx.strokeStyle = "white";
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + segmentAngle / 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(segmentNames[i], radius / 2, 0);
    ctx.restore();
  }
}

function draw_stand() {
  const canvas_stand = document.getElementById("stand");
  const ctx_stand = canvas_stand.getContext("2d");

  ctx_stand.fillStyle = "brown";
  ctx_stand.fillRect(
    canvas_stand.width / 2 - 100,
    canvas_stand.height - 30,
    200,
    20
  );

  // Draw the legs of the stand
  ctx_stand.fillStyle = "brown";
  ctx_stand.fillRect(
    canvas_stand.width / 2 - 20,
    canvas_stand.height - 150,
    20,
    150
  );
  ctx_stand.fillRect(
    canvas_stand.width / 2 + 10,
    canvas_stand.height - 150,
    20,
    150
  );
}

function draw_pointer() {
  const canvas_pointer = document.getElementById("pointer");
  const ctx_pointer = canvas_pointer.getContext("2d");

  
  // Clear the canvas
  ctx_pointer.clearRect(0, 0, canvas_pointer.width, canvas_pointer.height);

  const centerX = canvas_pointer.width / 2;
  const centerY = canvas_pointer.height / 2;

  // Calculate the coordinates of the triangle
  const triangleWidth = 5; // Adjust the width of the triangle as needed
  const triangleHeight = 150; // Adjust the height of the triangle as needed

  const x1 = centerX - triangleWidth / 2;
  const y1 = centerY - triangleHeight / 2;
  const x2 = centerX + triangleWidth / 2;
  const y2 = centerY - triangleHeight / 2;
  const x3 = centerX;
  const y3 = centerY + triangleHeight / 2;


  ctx_pointer.beginPath();
  ctx_pointer.moveTo(x3, y3);
  ctx_pointer.lineTo(x1, y1);
  ctx_pointer.lineTo(x2, y2);
  ctx_pointer.closePath();

  // Set the fill color and fill the triangle
  ctx_pointer.fillStyle = "white";
  ctx_pointer.strokeStyle = "black"
  
  ctx_pointer.fill();
  ctx_pointer.stroke()
  
  
}

draw_pointer();
drawWheel();
draw_stand();

function animateWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw_pointer();
  drawWheel();
  draw_stand();

  if (rotation_speed >= 0) {
    spin_button.disabled = true;
    rotationAngle += rotation_speed;
    rotation_speed -= rotation_deceleration;
    requestAnimationFrame(animateWheel);
  } else {
    spin_button.disabled = false;
  }
}

function game() {
  // rotationAngle = 0
  rotation_speed = 0.52;

  animateWheel();
}
