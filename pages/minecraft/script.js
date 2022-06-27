/**
 @type {HTMLCanvasElement}
 */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scale = 1;

const convertTo2d = ({ x, y, z }, width = 1920, height = 1080) => {
  const x3d = y * scale;
  const y3d = z * scale;
  const depth = x * scale;
  const scaled = scaleFunc(x3d, y3d, depth);
  return { x: width / 2 + scaled.x, y: height / 2 - scaled.y };
};
const scaleFunc = (x3d, y3d, depth) => {
  let dist = Math.sqrt(x3d * x3d + y3d * y3d);
  const theta = Math.atan2(y3d, x3d);
  const depth2 = 15 - depth; //relative to the camera. number of x points away from the camera
  const localScale = Math.abs(1400 / (depth2 + 1400));
  dist *= localScale;
  const x = dist * Math.cos(theta);
  const y = dist * Math.sin(theta);
  return { x, y };
};

class Polygon {
  constructor(points, color = "yellow") {
    this.points = points;
    this.color = color;
  }
  draw(ctx) {
    ctx.beginPath();
    // convert point before using
    const { x, y } = convertTo2d(this.points[0]);
    ctx.moveTo(x, y);
    // ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      // ctx.lineTo(this.points[i].x, this.points[i].y);
      const { x, y } = convertTo2d(this.points[i]);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }
}
class Tetrahedron {
  constructor(polygons) {
    this.polygons = polygons;
  }
  draw(ctx) {
    this.polygons.forEach((polygon) => polygon.draw(ctx));
  }
}
