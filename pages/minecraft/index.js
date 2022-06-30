import React, { useEffect } from "react";
import { init } from "pages/_app.js";
import Manage, { add } from "./manager.js";
// import CleanUp from "./script.js";

export default function Minecraft() {
  useEffect(() => {
    init();
    // require("./script.js");
  }, []);
  // useEffect(() => {
  //   return () => {
  //     console.log("wow this shit");
  //   };
  // });
  return (
    <>
      {/* <canvas id="canvas1"></canvas> */}
      <Manage></Manage>
    </>
  );
}
