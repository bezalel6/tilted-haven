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
      <h1>
        this is the only game i actually put some time into. it took me like a
        day, and most of it was fighting with react (yes. this is me flexing)
      </h1>
      <br />
      <iframe
        src="https://www.funnyhowtheknightmoves.com/"
        width="90%"
        height="90%"
        className="fullscreen"
        id="frame"
      ></iframe>
    </>
  );
}
