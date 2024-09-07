import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "#/hooks/useActions";
import { RootState } from "#/redux/store";
import Board from "#/components/game/board/Board";
import CellsMenu from "#/components/game/cells_menu/CellsMenu";
import styles from "./Game.module.css";

const Game = () => {
  const areEmptyCells = useSelector(
    (state: RootState) => state.settings.areEmptyCells
  );
  const { initializeGame } = useActions();

  useEffect(() => {
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
  }, [areEmptyCells, initializeGame]);

  return (
    <div className={styles.game}>
      <Board />
      <CellsMenu />
    </div>
  );
};

export default Game;
