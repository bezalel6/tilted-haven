/**
 @type {HTMLCanvasElement}
 */
export function createBlock(location, s = 100) {
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
  polygons = polygons.map((p) => new Polygon(p, location));
  const tetra = new Tetrahedron(polygons);
  tetra.location = location;
  return tetra;
}
export default function isAScam() {
  return <>you shouldnt see this</>;
}

// const canvas = document.getElementById("canvas1");
// const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

const scale = 1;
const perspective = 1400;
const convertTo2d = (obj, loc) => {
  const { x, y, z } = obj;
  const x3d = y * scale;
  const y3d = z * scale;
  const depth = x * scale + 100;
  const scaled = scaleFunc(x3d, y3d, depth, loc);
  return { x: loc.x + scaled.x, y: loc.y - scaled.y };
};
export const scaleFunc = (x3d, y3d, depth, loc) => {
  let dist = Math.sqrt(x3d * x3d + y3d * y3d);
  const theta = Math.atan2(y3d, x3d);
  // rand between 15 and 300
  const depth2 = 15 - depth; //relative to the camera. number of x points away from the camera
  const localScale = Math.abs(perspective / (depth2 + perspective));
  dist *= localScale;
  const x = dist * Math.cos(theta);
  const y = dist * Math.sin(theta);
  return { x, y };
};
const clrs = ["green", "yellow", "blue", "red", "pink", "cyan"];
let index = 0;
class Polygon {
  constructor(points, loc, color = clrs[index++]) {
    index = index % clrs.length;
    this.points = points;
    this.color = color;
    this.loc = loc;
    this.highlighted = false;
  }
  draw(ctx, clr = this.color) {
    ctx.fillStyle = clr;
    ctx.beginPath();
    // convert point before using
    const { x, y } = convertTo2d(this.points[0], this.loc);
    ctx.moveTo(x, y);
    // ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      // ctx.lineTo(this.points[i].x, this.points[i].y);
      const { x, y } = convertTo2d(this.points[i], this.loc);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    if (this.highlighted) {
      this.highlight(ctx);
    }
  }
  highlight(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // convert point before using
    const { x, y } = convertTo2d(this.points[0], this.loc);
    ctx.moveTo(x, y);
    // ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      // ctx.lineTo(this.points[i].x, this.points[i].y);
      const { x, y } = convertTo2d(this.points[i], this.loc);
      ctx.lineTo(x, y);
    }
    // ctx.closePath();
    // ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.stroke();
  }
  startHighlight() {
    this.highlighted = true;
  }
  stopHighlight() {
    this.highlighted = false;
  }
  getAvgX() {
    let sum = 0;
    this.points.forEach((p) => (sum += p.x));
    return sum / this.points.length;
  }

  rotate(degX, degY, degZ, cw = true) {
    this.points.forEach((point) => {
      rotateX(point, degX, cw);
      rotateY(point, degY, cw);
      rotateZ(point, degZ, cw);
    });
  }
}
const rotateX = (p, deg, cw) => {
  let radius = Math.sqrt(p.y * p.y + p.z * p.z);
  // radius = strip(radius);
  let theta = Math.atan2(p.z, p.y);
  // theta = strip(theta);
  theta += ((2 * Math.PI) / 360) * deg * (cw ? -1 : 1);
  // theta = strip(theta);
  p.y = radius * Math.cos(theta);
  p.z = radius * Math.sin(theta);
};
const rotateY = (p, deg, cw) => {
  const radius = Math.sqrt(p.x * p.x + p.z * p.z);
  let theta = Math.atan2(p.x, p.z);
  // theta = strip(theta);
  theta += ((2 * Math.PI) / 360) * deg * (cw ? -1 : 1);
  p.x = radius * Math.sin(theta);
  p.z = radius * Math.cos(theta);
};
const rotateZ = (p, deg, cw) => {
  const radius = Math.sqrt(p.y * p.y + p.x * p.x);
  let theta = Math.atan2(p.y, p.x);
  theta += ((2 * Math.PI) / 360) * deg * (cw ? -1 : 1);
  p.y = radius * Math.sin(theta);
  p.x = radius * Math.cos(theta);
};
class Tetrahedron {
  constructor(polygons) {
    this.polygons = polygons;
    this.highlited = false;
  }
  draw(ctx) {
    this.polygons.forEach((polygon) => {
      polygon.draw(ctx);
    });
  }
  highlight() {
    this.highlited = true;
    this.polygons.forEach((polygon) => {
      polygon.startHighlight();
    });
  }
  unhighlight() {
    this.highlited = false;
    this.polygons.forEach((polygon) => {
      polygon.stopHighlight();
    });
  }

  rotate(degX, degY, degZ, cw = true) {
    this.polygons.forEach((poly) => poly.rotate(degX, degY, degZ, cw));
    this.sort();
  }
  sort() {
    this.polygons = this.polygons.sort((a, b) => a.getAvgX() - b.getAvgX());
  }
}

// export default function isAScam(){
//   return <>you shouldnt see this</>
// }
// if (localStorage.lastId) {
//   clearInterval(localStorage.lastId);
// }

// localStorage.lastId = setInterval(() => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   tetra.draw(ctx);
//   tetra.rotate(1, 1, 0);
// }, 100);
