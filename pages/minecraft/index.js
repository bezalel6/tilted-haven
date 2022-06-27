import React, { useEffect } from "react";
import { init } from "pages/_app.js";

export default function Minecraft() {
  useEffect(() => {
    init();
    require("./script.js");
  }, []);
  return (
    <>
      <canvas id="canvas1"></canvas>
    </>
  );
}
