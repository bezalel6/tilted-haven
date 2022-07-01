import Head from "next/head";
import Footer from "@components/Footer";
import Button from "@components/VideoBtn";
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
  // const router = useRouter();
  useEffect(() => {
    const lost = location.href.includes("lost=")
      ? location.href.substring(location.href.indexOf("lost=") + "lost=".length)
      : null;
    init(parseInt(lost));
    // mySetSrc("dQw4w9WgXcQ");
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Tilted Haven</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MyHeader className="type-h1"></MyHeader>

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
            <h2>Games</h2>
            <br></br>
            <div className={styles.buttons_container}>
              <Button
                src=""
                text="Knight"
                setSrc={(a) => {
                  location.pathname += "/knight";
                }}
              ></Button>
              <Button
                src=""
                text="Minecraft"
                setSrc={(a) => {
                  location.pathname += "/three-minecraft";
                }}
              ></Button>
              <Button
                src=""
                text="Cubes"
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
      </main>

      <Footer />
    </div>
  );
}
