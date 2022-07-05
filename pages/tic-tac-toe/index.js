import $ from "jquery";
import { init } from "pages/_app";
import { useEffect } from "react";

export default function Knight() {
  useEffect(() => {
    $("#frame").contents().find("head link, style").remove();
    init(undefined, undefined, {
      header:
        "i made this in like half a day. most of which was fighting with react. ('weird flex but ok')",
    });
  }, []);

  return (
    <>
      <iframe
        src="https://my-tic-tac-toe-ai.netlify.app//"
        width="100%"
        height="100%"
        className="fullscreen"
        id="frame"
      ></iframe>
    </>
  );
}
