import { useEffect } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import styles from "./SettingsButton.module.css";

const SettingsButton = ({ content, checked, active, onClick }) => {
  useEffect(() => {
    if (!active) return;

    const onKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") onClick();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <button
      className={`
                ${styles.settingsBtn} \
                ${active && styles.active}
            `}
      onClick={onClick}
    >
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
