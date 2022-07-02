import $ from "jquery";
import { useEffect } from "react";

export default function Knight() {
  useEffect(() => $("#frame").contents().find("head link, style").remove(), []);

  return (
    <>
      <iframe
        src="https://www.funnyhowtheknightmoves.com/"
        width="100%"
        height="100%"
        className="fullscreen"
        id="frame"
      ></iframe>
    </>
  );
}
