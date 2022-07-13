import $ from "jquery";
import { init } from "pages/_app";
import { useEffect } from "react";

export default function Knight() {
  useEffect(() => {
    $("#frame").contents().find("head link, style").remove();
    init();
  }, []);

  return (
    <>
      <p>
        i didn't make this. this is just an iframe of{" "}
        <a href="https://www.funnyhowtheknightmoves.com/">this website</a>{" "}
      </p>
      <iframe
        src="https://www.funnyhowtheknightmoves.com/"
        // width="90%"
        // height="90%"
        className="fullscreen"
        id="frame"
      ></iframe>
    </>
  );
}
