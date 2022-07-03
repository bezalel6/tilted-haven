import Button from "@components/VideoBtn";
import { useEffect, useRef } from "react";
import { createBlock, scaleFunc } from "./block";

let entities;

const myLoc = { x: 0, y: 0, z: 10 };

export default function Manage() {
  entities = [];
  let canvasRef = useRef(null);
  useEffect(() => {
    canvasRef.current.width = window.innerWidth - 100;
    canvasRef.current.height = window.innerHeight - 400;
    // canvasRef.current.height = window.innerHeight;
    let clicking = false;
    canvasRef.current.addEventListener(
      "mousedown",
      () => {
        clicking = true;
      },
      false
    );
    canvasRef.current.addEventListener(
      "mouseup",
      () => {
        clicking = false;
      },
      false
    );
    let currentlyHighlighted = null;
    // listen to mouse clicks
    canvasRef.current.addEventListener("click", (e) => {
      // find the block clicked on
      const x = e.offsetX;
      const y = e.offsetY;
      const block = entities.find((b) => {
        const { x: bx, y: by } = b.location;
        return x >= bx && x <= bx + 100 && y >= by && y <= by + 100;
      });
      if (currentlyHighlighted) {
        currentlyHighlighted.unhighlight();
        currentlyHighlighted = null;
        return;
      }
      if (currentlyHighlighted == block) {
        currentlyHighlighted = null;
        return;
      }
      if (block) {
        console.log("omg i found it");
        block.highlight();
        currentlyHighlighted = block;
      }
    });
    let lastCords = { x: 0, y: 0 };
    // listen for mouse drag
    canvasRef.current.addEventListener("mousemove", (e) => {
      if (clicking) {
        const { x, y } = e;
        let deltaX = x - lastCords.x;
        let deltaY = y - lastCords.y;
        const boutaMove = currentlyHighlighted
          ? [currentlyHighlighted]
          : entities;
        boutaMove.forEach((entity) => {
          entity.rotate(-deltaX, -deltaY, 0);
        });
        lastCords = { x, y };
      }
    });
    const ctx = canvasRef.current.getContext("2d");
    let numRotated = 0;

    setInterval(() => {
      // ctx.save();
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      if (numRotated < entities.length) {
        const entity = entities[numRotated++];
        entity.rotate(0, 45, 0);
        numRotated = entities.length;
      }

      entities.forEach((entity) => {
        // ctx.moveTo(entity.location.x, entity.location.y);
        entity.draw(ctx);
      });
      // ctx.restore();
    }, 10);
  }, []);

  return (
    <>
      <Button
        text="Spawn Cube"
        setSrc={() => {
          // spawb a block and add it to the list of entities at a random location on the screen
          const location = {
            x: Math.random() * canvasRef.current.width,
            y: Math.random() * canvasRef.current.height,
            z: 0,
          };
          const block = createBlock(location);
          entities.push(block);
        }}
      ></Button>
      <canvas ref={canvasRef} id="canvas1"></canvas>
    </>
  );
}
