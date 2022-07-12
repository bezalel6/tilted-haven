import styles from "../styles/Buttons.module.css";

export default function Button({
  setSrc,
  src,
  text,
  disabled = false,
  title = "",
}) {
  const click = () => {
    setSrc(src);
  };

  return (
    <div title={title}>
      <button disabled={disabled} className={styles.button} onClick={click}>
        {text}
      </button>
    </div>
  );
}
