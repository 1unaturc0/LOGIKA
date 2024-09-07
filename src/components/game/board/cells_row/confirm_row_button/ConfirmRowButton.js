import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import { useActions } from "#/hooks/useActions";
import styles from "./ConfirmRowButton.module.css";

const ConfirmRowButton = () => {
  const areEmptyCells = useSelector((state) => state.settings.areEmptyCells);
  const { cells, activeCell } = useSelector((state) => state.game);
  const enabled = areEmptyCells || !cells[activeCell.row].includes(0);
  const { confirmRow } = useActions();

  const onClick = () => {
    if (enabled) confirmRow();
  };

  useEffect(() => {
    if (activeCell.column !== null || !enabled) return;

    const onKeyDown = (e) => {
      if (e.key === "Enter" || e.key === "w" || e.key === "ArrowUp")
        confirmRow();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [confirmRow, activeCell.column, enabled]);

  return (
    <button
      onClick={onClick}
      className={`
        ${styles.confirmRowBtn} \
        ${enabled || styles.disabled} \
        ${activeCell.column === null && styles.active}
      `}
    >
      <FaCheck className={styles.icon} />
    </button>
  );
};

export default ConfirmRowButton;
