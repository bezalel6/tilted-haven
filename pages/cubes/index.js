import React, { useEffect } from "react";
import { init } from "pages/_app.js";
import Manage, { add } from "./manager.js";
// import CleanUp from "./script.js";

export default function Cubes() {
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
      <div className="yep">
        <h4>i wrote this without using a 3d library</h4>
        <p>(yes. this is a flex)</p>
        <h4>
          you can drag with your mouse to spin all the cubes, or click on one
          and spin it
        </h4>
      </div>
      <Manage></Manage>
    </>
  );
}
