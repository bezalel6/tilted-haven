import Head from "next/head";
import Footer from "@components/Footer";
import Button from "@components/Button";
import { useEffect, useState } from "react";
import MyHeader from "@components/SiteHeader";
import { useRouter } from "next/router";
import { init } from "./_app";
import styles from "../styles/Buttons.module.css";

const CALM = ["nwg7Jk0Gjoc"],
  ENTERTAINING = ["g-epFZZ4ftE", "bf9nXS9rmuw"];

export default function Home() {
  const [src, setSrc] = useState("");
  const mySetSrc = (vidId) => {
    // check if vidId is an array and if it is choose a random element
    if (Array.isArray(vidId)) {
      vidId = vidId[Math.floor(Math.random() * vidId.length)];
    }
    // one in a million chance of rickrolling
    if (Math.random() < 0.000001) {
      vidId = "dQw4w9WgXcQ";
    }

    setSrc("https://www.youtube.com/embed/" + vidId + "?autoplay=1");
  };
  useEffect(() => {
    // get query params from url
    const query = new URLSearchParams(window.location.search);
    init(parseInt(query.get("lost")), parseInt(query.get("cooldown")));
    // mySetSrc("dQw4w9WgXcQ");
    // if (location.search) location.replace(location.pathname);
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Tilted Haven</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MyHeader className="type-h1"></MyHeader>
        <Info></Info>
        <iframe
          className={styles.frame}
          width="100%"
          height="100%"
          src={src}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <br></br>
        <div className={styles.outer_container}>
          <div className={styles.container}>
            <h2>Videos</h2>
            <br></br>
            <div className={styles.buttons_container}>
              <Button
                src={CALM}
                text="Calm"
                c={styles.button}
                className={styles.button}
                setSrc={mySetSrc}
              ></Button>
              <Button
                c={styles.button}
                className={styles.button}
                src={ENTERTAINING}
                text="Entertaining"
                setSrc={mySetSrc}
              ></Button>
            </div>
          </div>
          <div className={styles.container}>
            <h2>Other stuff</h2>
            <br></br>
            <div className={styles.buttons_container}>
              <Button
                src=""
                text="tic tac toe"
                setSrc={(a) => {
                  location.pathname += "/tic-tac-toe";
                }}
              ></Button>
              <br></br>
              <Button
                src=""
                title="not mine"
                text="Knight moves"
                setSrc={(a) => {
                  location.pathname += "/knight";
                }}
              ></Button>
              {/* <Button
                src=""
                text="Minecraft"
                setSrc={(a) => {
                  location.pathname += "/three-minecraft";
                }}
              ></Button> */}
              <Button
                src=""
                text="Cubes thing"
                setSrc={(a) => {
                  location.pathname += "/cubes";
                }}
              ></Button>
              <Button
                src=""
                text="Snake"
                setSrc={(a) => {
                  location.pathname += "/snake";
                }}
              ></Button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

function Info() {
  return (
    <>
      <section>
        hi, i'm a dumbass. and i have a tendency to lose a couple games, get
        mad, and go on to lose like 20 games in a row. so i made something to
        stop me from playing while tilted. this website is mostly just a
        placeholder until you calm down, but i put a couple things to maybe pass
        the time
      </section>
    </>
  );
}
