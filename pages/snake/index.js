import { init } from "pages/_app.js";
import React, { useEffect } from "react";
import onInit from "./lib/script";

const Play = (props) => {
  useEffect(() => {
    // require("./lib/script.js");
    if (process.browser) onInit(document);
    init();
  }, []);
  return (
    <>
      <canvas id="canvas1"></canvas>
    </>
  );
};

export default Play;
