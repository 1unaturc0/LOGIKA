import { useEffect } from "react";
import { useActions } from "#/hooks/useActions";
import Cell from "#/components/cell/Cell";
import styles from "./CellsMenu.module.css";

const CellsMenu = () => {
  const { changeCellColor } = useActions();

  const cellOnClick = (colorId) => changeCellColor(colorId);

  const cells = [];
  for (let i = 0; i < 9; i++)
    cells.push(<Cell key={i} colorId={i} onClick={() => cellOnClick(i)} />);

  useEffect(() => {
    const onKeyDown = (e) => {
      let colorId = e.key === "Backspace" ? 0 : Number(e.key);
      if (colorId < 9) cellOnClick(colorId);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className={styles.cellsMenu}>
      <div className={styles.cells}>{cells}</div>
    </div>
  );
};

export default CellsMenu;
