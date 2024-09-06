import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUndo } from "react-icons/fa";
import { useActions } from "#/hooks/useActions";
import styles from "./RestartButton.module.css";

const RestartButton = () => {
  const areEmptyCells = useSelector((state) => state.settings.areEmptyCells);
  const { initializeGame } = useActions();

  const onClick = () => {
    initializeGame(
      areEmptyCells
        ? [
            Math.floor(Math.random() * 9),
            Math.floor(Math.random() * 9),
            Math.floor(Math.random() * 9),
            Math.floor(Math.random() * 9),
            Math.floor(Math.random() * 9),
          ]
        : [
            Math.floor(Math.random() * 8 + 1),
            Math.floor(Math.random() * 8 + 1),
            Math.floor(Math.random() * 8 + 1),
            Math.floor(Math.random() * 8 + 1),
            Math.floor(Math.random() * 8 + 1),
          ]
    );
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "r") onClick();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <button onClick={onClick} className={styles.restartBtn}>
      <FaUndo />
    </button>
  );
};

export default RestartButton;
