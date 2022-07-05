import React, { useEffect } from "react";
import { init } from "pages/_app.js";
import Manage, { add } from "./manager.js";
// import CleanUp from "./script.js";

export default function Cubes() {
  // the fucking timer is breaking it
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <div className="yep">
        <h4>written without a 3d library</h4>
        <p> (yes. this is me flexing) </p>
        <h4>click & drag to spin</h4>
      </div>
      <Manage></Manage>
    </>
  );
}
