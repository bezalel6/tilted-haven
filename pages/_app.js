import Button from "@components/VideoBtn";
import "@styles/globals.css";
import { useEffect, useState } from "react";
import styles from "../styles/Buttons.module.css";

let updateOutside, outsideLeft, setDisabled;

const fixTop = ["minecraft"];
let setterLost;
function Application({ Component, pageProps }) {
  const [left, setLeft] = useState(0);
  const [isHome, setIsHome] = useState(true);
  const [lichessDisabled, setDisabledd] = useState(true);
  const [currentUrl, setUrl] = useState();
  const [lostNumSS, setLost] = useState(0);
  useEffect(() => {
    updateOutside = setLeft;
    outsideLeft = left;
    setDisabled = setDisabledd;
    setterLost = setLost;
    return () => (updateOutside = setDisabled = null);
  });
  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem("tilt"));
    if (obj) {
      const elapsed = Date.now() - obj.start;
      setLeft(obj.tilt - elapsed);
    }
    const setting = location.pathname.replace("/", "") == "";
    setIsHome(setting);
    setUrl(location.pathname);
  }, []);
  return (
    <div
      className={
        "top" +
        (fixTop.find((str) => {
          try {
            return currentUrl && currentUrl.includes(str);
          } catch {
            return false;
          }
        })
          ? " fixme"
          : "")
      }
    >
      {lostNumSS && (
        <>
          you lost {lostNumSS} games in a row<br></br>
        </>
      )}

      {convertMsToHMS(left)}
      {<a href="https://github.com/bezalel6/tilted-haven">Source</a>}
      <div className={styles.buttons_container}>
        {!lichessDisabled && (
          <Button
            text="lichess"
            setSrc={() => {
              location.replace("https://lichess.org/");
            }}
            disabled={lichessDisabled}
          ></Button>
        )}
        {!isHome && (
          <Button
            text="home"
            setSrc={() => {
              location.pathname = "";
            }}
          ></Button>
        )}
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default Application;

export const init = (numLostGames, cooldown) => {
  if (typeof window == "undefined") {
    return;
  }
  if (setterLost && numLostGames) setterLost(numLostGames);

  const pressed = {};
  const magicKey = "Space";
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey) pressed.ctrl = true;
    if (e.shiftKey) pressed.shiftKey = true;
    if (e.code == magicKey) pressed.esc = true;
    if (pressed.ctrl && pressed.shiftKey && pressed.esc) {
      e.preventDefault();
      console.log("bruh");
      localStorage.removeItem("tilt");
      location.reload();
    }
  });
  // listen for key up
  document.addEventListener("keyup", (e) => {
    if (e.ctrlKey) pressed.ctrl = false;
    if (e.shiftKey) pressed.shiftKey = false;
    if (e.code == magicKey) pressed.esc = false;
  });

  const inter = setInterval(() => {
    if (updateOutside) {
      a(numLostGames, cooldown);
      clearInterval(inter);
    }
  }, 100);
};
function a(numLostGames, cooldown) {
  let obj = JSON.parse(localStorage.getItem("tilt"));
  if (numLostGames && (!obj || !obj.start)) {
    console.log("didnt find");
    obj = { start: Date.now(), tilt: cooldown * 60 * 1000, lost: numLostGames };
    console.log("%c_app.js line:99 obj", "color: #007acc;", obj);
    updateOutside(obj.tilt);
  } else if (!obj && !numLostGames) {
    setDisabled(false);
    localStorage.removeItem("tilt");
    return;
  }
  setterLost && setterLost(obj.lost);
  const elapsed = Date.now() - obj.start;
  updateOutside(obj.tilt - elapsed);
  localStorage.setItem("tilt", JSON.stringify(obj));
  console.log("starting timer");
  setInterval(() => {
    if (outsideLeft < 0 && updateOutside) {
      updateOutside(0);
    } else if (outsideLeft >= 1000 && updateOutside) {
      updateOutside(outsideLeft - 1000);
    }
    setDisabled(outsideLeft > 0);
    if (outsideLeft <= 0) {
      localStorage.removeItem("tilt");
      // if (numLostGames) a(numLostGames);
    }
  }, 1000);
  if (numLostGames && cooldown) location.replace(location.pathname);
}
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function convertMsToHMS(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  // // 👇️ if seconds are greater than 30, round minutes up (optional)
  // minutes = seconds >= 30 ? minutes + 1 : minutes;

  minutes = minutes % 60;

  let timeStr = "";
  let force = 0;
  if (hours > 0) {
    timeStr += padTo2Digits(hours) + ":";
    force = 1;
  }
  // if (minutes > 0 || force) {
  timeStr += padTo2Digits(minutes);
  force = 1;
  // }
  // if (seconds > 0 || force) {
  timeStr += "." + padTo2Digits(seconds);
  // }

  return timeStr;
}
