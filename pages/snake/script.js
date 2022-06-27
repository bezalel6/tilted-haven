/**
 @type {HTMLCanvasElement}
 */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
ctx.fillStyle = back;
// ctx. = "blue";

class Link {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
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
        // if(index<this.parts.length-1){
        //   part.x = this.parts[index+1]
        //   part.y += dirY * speed;
        // }
      });
    }, 100);
  }
  update() {
    ctx.fillStyle = "black";
    this.parts.forEach((part) => {
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
  dirX = dirY = 0;
  if (event.code.startsWith("Arrow")) {
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
});
// mouse click
canvas.addEventListener("mouseup", function (event) {
  new Snake(event.x, event.y).update();
});

module.exports = {
  connect: function () {},
};
