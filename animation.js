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

let width,
  height,
  velocityX = 1,
  velocityY = 1,
  pause = true,
  previousColor = 0;
setInterval(() => {
  if (pause) return;

  let rect = label.getBoundingClientRect();
  let offset = 75;

  let left = rect.x;
  let top = rect.y;

  if (left + rect.width - offset >= width || left <= -offset) {
    velocityX = -velocityX;
    let randomColor = getRandomColor();
    label.style.stroke = randomColor;
    label.style.fill = randomColor;

    if (left + 150 <= width / 2) {
      body.style.boxShadow = `inset 4px 0px 0px 0px ${randomColor}`;
    } else {
      body.style.boxShadow = `inset -4px 0px 0px 0px ${randomColor}`;
    }
  }
  if (top + rect.height >= height || top <= 0) {
    velocityY = -velocityY;
    let randomColor = getRandomColor();
    label.style.stroke = randomColor;
    label.style.fill = randomColor;

    if (top + 28 <= height / 2) {
      body.style.boxShadow = `inset 0px 4px 0px 0px ${randomColor}`;
    } else {
      body.style.boxShadow = `inset 0px -4px 0px 0px ${randomColor}`;
    }
  }

  label.style.left = rect.x + velocityX + "px";
  label.style.top = rect.y + velocityY + "px";
}, 1000 / FPS);

const reset = () => {
  width = 
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  pause =
    width <= label.getBoundingClientRect().width ||
    height <= label.getBoundingClientRect().height;

  label.style.left = "calc(50vw - 150px)";
  label.style.top = "calc(50vh - 28px)";
  label.style.stroke = colors[0];
  label.style.fill = colors[0];
};

const getRandomColor = () => {
  let currentColor = -1;

  do {
    currentColor = Math.floor(Math.random() * colors.length);
  } while (previousColor == currentColor);

  previousColor = currentColor;

  return colors[currentColor];
};

reset();

window.addEventListener("resize", reset, true);