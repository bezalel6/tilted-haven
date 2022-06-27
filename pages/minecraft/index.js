import React, { useEffect } from "react";
import { init } from "pages/_app.js";

export default function Minecraft() {
  useEffect(() => {
    require("./script.js");
    init();
  }, []);
  return (
    <>
      <canvas id="canvas1"></canvas>
    </>
  );
}
