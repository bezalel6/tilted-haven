import React, { useEffect } from "react";
import { init } from "pages/_app.js";
// import CleanUp from "./script.js";

export default function Minecraft() {
  useEffect(() => {
    init();
    var clean = require("./script.js");
    // clean();
    console.log("%cindex.js line:10 clean", "color: #007acc;", clean.default);
    return () => console.log("this is returning");
  }, []);
  // useEffect(() => {
  //   return () => {
  //     console.log("wow this shit");
  //   };
  // });
  return (
    <>
      <canvas id="canvas1"></canvas>
    </>
  );
}
