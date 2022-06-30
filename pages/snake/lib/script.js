/**
 @type {HTMLCanvasElement}
 */

try {
  if (!document) {
    throw new Error("document is undefined");
  }
  onInit();
} catch {
  // return;
}

const onInit = () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth - 100;
  canvas.height = window.innerHeight - 200;

  let drawing = false;
  ctx.fillStyle = "#FFF5DE";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 10;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.globalCompositeOperation = "destination-over";
  ctx.font = "35px Arial";
  const back = ctx.fillStyle;
  ctx.fillStyle = "black";
  ctx.fillText("Click", 100, 100);
  ctx.fillText(
    "I couldn't be bothered to add like.. gameplay... so enjoy controlling a moving dot",
    100,
    200
  );
  ctx.fillStyle = back;
  // ctx. = "blue";

  class Link {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 50;
      this.stopMe = true;
    }
  }
  class Snake {
    constructor(x, y) {
      this.parts = [];
      this.parts.push(new Link(x, y));
      this.autoMove();
    }

    autoMove() {
      setInterval(() => {
        this.parts[0].x += dirX * speed;
        this.parts[0].y += dirY * speed;
        this.parts.forEach((part, index) => {
          if (part.stopMe === true) {
            part.stopMe = 1;
            return;
          } else if (part.stopMe === 1) {
            part.stopMe = 2;
            return;
          }
          if (index >= 1) {
            part.x = this.parts[index - 1].x;
            part.y = this.parts[index - 1].y;
          }
        });
      }, 100);
    }
    update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      this.parts.forEach((part) => {
        if (part.x < 0) {
          part.x = canvas.width - part.size;
        }
        if (part.x > canvas.width - part.size) {
          part.x = 0;
        }
        if (part.y < 0) {
          part.y = canvas.height - part.size;
        }
        if (part.y > canvas.height - part.size) {
          part.y = 0;
        }
        // fillrect but clip if getting out of bounds

        ctx.fillRect(part.x, part.y, part.size, part.size);
      });
      // console.log("first");
      requestAnimationFrame(this.update.bind(this));
    }
  }
  let dirX = 0,
    dirY = 0;
  const speed = 60;
  // listen for arrow keys
  document.addEventListener("keydown", function (event) {
    if (event.code.startsWith("Arrow")) {
      dirX = dirY = 0;
      if (event.code.endsWith("Up")) {
        dirY = -1;
      }
      if (event.code.endsWith("Down")) {
        dirY = 1;
      }
      if (event.code.endsWith("Left")) {
        dirX = -1;
      }
      if (event.code.endsWith("Right")) {
        dirX = 1;
      }
    }
    if (event.key.toLowerCase() == "e") {
      snake.parts.push(
        new Link(
          snake.parts[snake.parts.length - 1].x,
          snake.parts[snake.parts.length - 1].y
        )
      );
    }
    console.log("%cscript.js line:106 event.key", "color: #007acc;", event.key);
    if (event.key == "q") {
      console.log("%cscript.js line:107 snake", "color: #007acc;", snake);
    }
  });
  // mouse click
  let snake;
  canvas.addEventListener("mouseup", function (event) {
    snake = new Snake(event.x, event.y);
    snake.update();
  });
};

export default function isAScam() {
  return <>you shouldnt see this</>;
}
