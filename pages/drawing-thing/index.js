import { init } from "pages/_app.js";
import React, { useEffect } from "react";

const Play = (props) => {
  useEffect(() => {
    require("./lib/script.js");
    init();
  }, []);
  return (
    <>
      <canvas id="canvas1"></canvas>
    </>
  );
};

export default Play;
