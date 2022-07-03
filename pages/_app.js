import Button from "@components/Button";
import "@styles/globals.css";
import { useEffect, useState } from "react";
import styles from "../styles/Buttons.module.css";

let updateTimeLeft, outsideLeft, setDisabled;

const fixTop = ["minecraft"];
let setterLost;
function Application({ Component, pageProps }) {
  const [left, setLeft] = useState(0);
  const [isHome, setIsHome] = useState(true);
  const [lichessDisabled, setDisabledd] = useState(true);
  const [currentUrl, setUrl] = useState();
  const [lostNumSS, setLost] = useState(0);
  useEffect(() => {
    updateTimeLeft = setLeft;
    outsideLeft = left;
    setDisabled = setDisabledd;
    setterLost = setLost;
    return () => (updateTimeLeft = setDisabled = null);
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
      {lichessDisabled && lostNumSS && (
        <>
          you lost {lostNumSS} game{lostNumSS > 1 ? "s" : ""} in a row<br></br>
        </>
      )}

      {convertMsToHMS(left)}
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
    if (updateTimeLeft) {
      initUpdating(numLostGames, cooldown);
      clearInterval(inter);
    }
  }, 100);
};
function initUpdating(numLostGames, cooldown) {
  let obj = JSON.parse(localStorage.getItem("tilt"));
  console.log("%c_app.js line:117 obj", "color: #007acc;", obj);
  if (numLostGames) {
    //check if there is an object of a thing already, that isnt expired already
    if (obj && cooldown && Date.now() - obj.start < cooldown * 60 * 1000) {
      console.log("there is a tilt thats not over yet.", obj);
    } else {
      console.log("didnt find");
      obj = {
        start: Date.now(),
        tilt: cooldown * 60 * 1000,
        lost: numLostGames,
      };
      console.log("%c_app.js line:99 obj", "color: #007acc;", obj);
      updateTimeLeft(obj.tilt);
    }
  } else if (!obj && !numLostGames) {
    console.log("second if");
    setDisabled(false);
    localStorage.removeItem("tilt");
    return;
  }
  setterLost && setterLost(obj.lost);
  const elapsed = Date.now() - obj.start;
  updateTimeLeft(obj.tilt - elapsed);
  outsideLeft = obj.tilt - elapsed;
  localStorage.setItem("tilt", JSON.stringify(obj));
  console.log("starting timer");

  if (numLostGames && cooldown) location.replace(location.pathname);
  else {
    startTimer();
  }
}
function startTimer() {
  let last = Date.now();
  const interval = setInterval(() => {
    let setNew = -1;
    if (updateTimeLeft)
      updateTimeLeft(Math.max(0, outsideLeft - Date.now() - last));
    setDisabled(outsideLeft > 0);
    if (outsideLeft <= 0) {
      console.log("removing tilt");
      localStorage.removeItem("tilt");
      clearInterval(interval);
      // if (numLostGames) a(numLostGames);
    }
    last = Date.now();
  }, 1000);
}
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function convertMsToHMS(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  let timeStr = "";
  if (hours > 0) {
    timeStr += padTo2Digits(hours) + ":";
  }
  timeStr += padTo2Digits(minutes);
  timeStr += "." + padTo2Digits(seconds);

  return timeStr;
}
