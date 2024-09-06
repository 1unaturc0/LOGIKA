import { useEffect } from "react";
import styles from "./MainButton.module.css";

const MainMenuButton = ({ content, active, onClick, children }) => {
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
                ${styles.mainBtn} \
                ${active && styles.active}
            `}
      onClick={onClick}
    >
      {children}
      {content}
    </button>
  );
};

export default MainMenuButton;
