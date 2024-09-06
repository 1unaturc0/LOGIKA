import { useSelector } from "react-redux";
import styles from "./Cell.module.css";

const cellColors = [
  "empty",
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "brown",
  "white",
  "black",
];

const Cell = ({ colorId, isActive, onClick }) => {
  const isColorNumeration = useSelector(
    (state) => state.settings.isColorNumeration
  );

  return (
    <div
      onClick={onClick}
      className={`
                ${styles.cell} \
                ${styles[cellColors[colorId]]} \
                ${isActive && styles.active}
            `}
    >
      {isColorNumeration && colorId !== 0 && colorId}
    </div>
  );
};

export default Cell;
