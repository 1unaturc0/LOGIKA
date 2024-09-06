import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "#/hooks/useActions";
import Cell from "#/components/cell/Cell";
import ConfirmRowButton from "#/components/game/board/cells_row/confirm_row_button/ConfirmRowButton";
import styles from "./CellsRow.module.css";

const CellsRow = ({ number }) => {
  const { cells, activeCell } = useSelector((state) => state.game);
  const { changeActiveCell } = useActions();

  const onCellClick = (row, column) => {
    if (row === activeCell.row) changeActiveCell({ row, column });
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (
        activeCell.column === null &&
        (e.key === "d" || e.key === "ArrowRight")
      )
        onCellClick(activeCell.row, 0);
      if (
        activeCell.column !== null &&
        activeCell.column < 4 &&
        (e.key === "d" || e.key === "ArrowRight")
      )
        onCellClick(activeCell.row, activeCell.column + 1);
      if (
        activeCell.column === null &&
        (e.key === "a" || e.key === "ArrowLeft")
      )
        onCellClick(activeCell.row, 4);
      if (activeCell.column > 0 && (e.key === "a" || e.key === "ArrowLeft"))
        onCellClick(activeCell.row, activeCell.column - 1);
      if (activeCell.column === 4 && (e.key === "d" || e.key === "ArrowRight"))
        onCellClick(activeCell.row, null);
      if (activeCell.column === 0 && (e.key === "a" || e.key === "ArrowLeft"))
        onCellClick(activeCell.row, null);
      if (
        activeCell.column !== null &&
        (e.key === "Enter" || e.key === "w" || e.key === "ArrowUp")
      )
        onCellClick(activeCell.row, null);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className={styles.cellsRow}>
      <span
        className={`
          ${styles.rowNum} \
          ${activeCell.row === number && styles.active}
        `}
      >
        {number + 1}
      </span>
      {cells[number].map((cell, i) => (
        <Cell
          key={i}
          colorId={cell}
          isActive={activeCell.row === number && activeCell.column === i}
          onClick={() => onCellClick(number, i)}
        />
      ))}
      {activeCell.row === number && <ConfirmRowButton />}
    </div>
  );
};

export default CellsRow;
