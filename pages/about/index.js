import { init } from "pages/_app";
import { useEffect } from "react";

export default function About() {
  useEffect(() => init(), []);

  return (
    <>
      <h1>About</h1>
    </>
  );
}
