import $ from "jquery";
import { init } from "pages/_app";
import { useEffect } from "react";

export default function Knight() {
  useEffect(() => {
    // $("#frame").contents().find("head link, style").remove();
    init(undefined, undefined, {
      header: "",
    });
  }, []);

  return (
    <>
      <iframe
        src="https://my-tic-tac-toe-ai.netlify.app//"
        width="100%"
        height="100%"
        className="most-fullscreen"
        id="frame"
      ></iframe>
    </>
  );
}
