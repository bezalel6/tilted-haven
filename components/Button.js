import styles from "../styles/Buttons.module.css";

export default function Button({ setSrc, src, text, disabled = false }) {
  const click = () => {
    setSrc(src);
  };

  return (
    <div>
      <button disabled={disabled} className={styles.button} onClick={click}>
        {text}
      </button>
    </div>
  );
}
