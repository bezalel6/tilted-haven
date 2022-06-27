// import styles from "../styles/typewriter.css";

import Header from "./Header";

export default function MyHeader({ title = "Welcome to Tilted Haven!" }) {
  return (
    <>
      <h1 className="type-h1">{title}</h1>
      <p className="subtitle">We Are Here To Save Your ELO</p>
    </>
  );
}
