/**
 @type {HTMLCanvasElement}
 */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scale = 1;

const convertTo2d = (obj, width = 1920, height = 1080) => {
  console.log("%cscript.js line:13 obj", "color: #007acc;", obj);
  const { x, y, z } = obj;
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
const clrs = ["green", "yellow", "blue", "red", "pink", "cyan"];
let index = 0;
class Polygon {
  constructor(points, color = clrs[index++]) {
    console.log("%cscript.js line:35 points", "color: #007acc;", points);
    this.points = points;
    this.color = color;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
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

  rotate(degX, degY, degZ, cw = true) {
    points.forEach((point) => {
      rotateX(point, degX, cw);
      // rotateY(point, degY, cw);
      // rotateZ(point, degZ, cw);
    });
  }
}
const rotateX = (p, deg, cw) => {
  console.log("b4", p);
  const radius = Math.sqrt(p.y * p.y + p.z * p.z);
  let theta = Math.atan2(p.z, p.y);
  theta += ((2 * Math.PI) / 360) * deg * (cw ? -1 : 1);
  p.y = radius * Math.cos(theta);
  p.z = radius * Math.sin(theta);
  console.log("after", p);
};
const rotateY = (p, deg, cw) => {
  const radius = Math.sqrt(p.y * p.y + p.z * p.z);
  let theta = Math.atan2(p.y, p.z);
  theta += ((2 * Math.PI) / 360) * deg * (cw ? 1 : -1);
  p.y = radius * Math.cos(theta);
  p.z = radius * Math.sin(theta);
};
const rotateZ = (p, deg, cw) => {
  const radius = Math.sqrt(p.y * p.y + p.z * p.z);
  let theta = Math.atan2(p.y, p.z);
  theta += ((2 * Math.PI) / 360) * deg * (cw ? 1 : -1);
  p.y = radius * Math.cos(theta);
  p.z = radius * Math.sin(theta);
};
class Tetrahedron {
  constructor(polygons) {
    this.polygons = polygons;
  }
  draw(ctx) {
    this.polygons.forEach((polygon) => polygon.draw(ctx));
  }
  rotate(degX, degY, degZ, cw = true) {
    this.polygons.forEach((poly) => poly.rotate(degX, degY, degZ, cw));
  }
}
// create all 8 points of a cube
const s = 100;
const points = [
  { x: s / 2, y: -s / 2, z: -s / 2 },
  { x: s / 2, y: s / 2, z: -s / 2 },
  { x: s / 2, y: s / 2, z: s / 2 },
  { x: s / 2, y: -s / 2, z: s / 2 },
  { x: -s / 2, y: -s / 2, z: -s / 2 },
  { x: -s / 2, y: s / 2, z: -s / 2 },
  { x: -s / 2, y: s / 2, z: s / 2 },
  { x: -s / 2, y: -s / 2, z: s / 2 },
];
const splice = (...oneBasedIndices) => {
  const ret = [];
  oneBasedIndices.forEach((i) => ret.push(points[i - 1]));
  return ret;
};
let polygons = [
  splice(1, 2, 3, 4),
  splice(5, 6, 7, 8),
  splice(1, 2, 6, 5),
  splice(1, 5, 8, 4),
  splice(2, 6, 7, 3),
  splice(4, 3, 7, 8),
];
polygons = polygons.map((p) => new Polygon(p));
const tetra = new Tetrahedron(polygons);
tetra.rotate(300, 0, 0);
tetra.draw(ctx);
