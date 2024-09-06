import { useState, useEffect } from "react";
import { isDesktopCheck } from "#/utils/isDesktopCheck";
import styles from "./ModalWindowButton.module.css";

const ModalWindowButton = ({ type, active, onClick, children }) => {
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (active && isDesktopCheck())
      setClassName(`
        ${styles.modalWindowBtn} \
        ${type === "confirm" ? styles.confirm : styles.decline} \
        ${styles.active}
      `);
    else
      setClassName(`
        ${styles.modalWindowBtn} \
        ${type === "confirm" ? styles.confirm : styles.decline}
      `);
  }, [active, type]);

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default ModalWindowButton;
