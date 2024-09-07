import { useSelector } from "react-redux";
import { RootState } from "#/redux/store";
import styles from "./Cell.module.css";
import { ICellProps } from "./ICell";

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

const Cell = ({ colorId, isActive, onClick }: ICellProps) => {
  const isColorNumeration = useSelector(
    (state: RootState) => state.settings.isColorNumeration
  );

  return (
    <div
      onClick={onClick}
      className={`
                ${styles.cell} \
                ${styles[cellColors[colorId] as keyof typeof styles]} \
                ${isActive && styles.active}
            `}
    >
      {isColorNumeration && colorId !== 0 && colorId}
    </div>
  );
};

export default Cell;
