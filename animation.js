const body = document.querySelector("body");
const label = document.querySelector("#label");

let colors = [
  "#55A19C",
  "#fc5c65",
  "#fd9644",
  "#fed330",
  "#2bcbba",
  "#45aaf2",
  "#4b7bec",
  "#a55eea",
  "#ffc1f3",
  "#76ead7",
  "#ff9c71",
  "#32e0c4",
  "#d291bc",
  "#fa744f",
];

let FPS = 60;

let width, height,
    velocityX = 1, velocityY = 1,
    pause = true,
    previousColor = 0;

const reset = () => {
  width = window.innerWidth;
  height = window.innerHeight;

  // Reset the position of the label to the center of the window
  label.style.left = `${(width - label.clientWidth) / 2}px`;
  label.style.top = `${(height - label.clientHeight) / 2}px`;

  // Reset the initial color
  label.style.stroke = colors[0];
  label.style.fill = colors[0];

  // Unpause the animation if there is enough space
  pause = width <= label.clientWidth || height <= label.clientHeight;
};

const getRandomColor = () => {
  let currentColor;
  do {
    currentColor = Math.floor(Math.random() * colors.length);
  } while (previousColor === currentColor);
  previousColor = currentColor;
  return colors[currentColor];
};

setInterval(() => {
  if (pause) return;

  // Update the current position based on velocity
  let currentLeft = parseInt(label.style.left, 10);
  let currentTop = parseInt(label.style.top, 10);

  // Adjust position
  let newLeft = currentLeft + velocityX;
  let newTop = currentTop + velocityY;

  // Horizontal boundary checks
  if (newLeft + label.clientWidth > width || newLeft < 0) {
    velocityX = -velocityX;
    newLeft = newLeft + 2 * velocityX; // Adjust position to prevent sticking to the boundary
    let randomColor = getRandomColor();
    label.style.stroke = randomColor;
    label.style.fill = randomColor;
    body.style.boxShadow = newLeft < width / 2 ?
      `inset 4px 0 0 0 ${randomColor}` : `inset -4px 0 0 0 ${randomColor}`;
  }

  // Vertical boundary checks
  if (newTop + label.clientHeight > height || newTop < 0) {
    velocityY = -velocityY;
    newTop = newTop + 2 * velocityY; // Adjust position to prevent sticking to the boundary
    let randomColor = getRandomColor();
    label.style.stroke = randomColor;
    label.style.fill = randomColor;
    body.style.boxShadow = newTop < height / 2 ?
      `inset 0 4px 0 0 ${randomColor}` : `inset 0 -4px 0 0 ${randomColor}`;
  }

  // Apply updated positions
  label.style.left = `${newLeft}px`;
  label.style.top = `${newTop}px`;
}, 1000 / FPS);

window.addEventListener("resize", reset);
reset();