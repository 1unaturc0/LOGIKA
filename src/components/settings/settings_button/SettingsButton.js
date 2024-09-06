import { useState, useEffect } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { isDesktopCheck } from "#/utils/isDesktopCheck";
import styles from "./SettingsButton.module.css";

const SettingsButton = ({ content, checked, active, onClick }) => {
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (active && isDesktopCheck())
      setClassName(`${styles.settingsBtn} ${styles.active}`);
    else setClassName(styles.settingsBtn);
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") onClick();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <button className={className} onClick={onClick}>
      {checked ? (
        <FaCheck className={styles.icon} />
      ) : (
        <FaXmark className={styles.icon} />
      )}
      <p>{content}</p>
    </button>
  );
};

export default SettingsButton;
