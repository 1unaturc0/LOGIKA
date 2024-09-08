import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "#/redux/store";
import ReturnButton from "#/components/return_button/ReturnButton";
import RestartButton from "#/components/game/board/restart_button/RestartButton";
import TurnTime from "#/components/game/board/turn_time/TurnTime";
import Cipher from "#/components/game/board/cipher/Cipher";
import CellsRow from "#/components/game/board/cells_row/CellsRow";
import PinsRow from "#/components/game/board/pins_row/PinsRow";
import styles from "./Board.module.css";

const Board = () => {
  const [screenHeight, setScreenHeight] = useState(0);
  const { activeCell, isGameOver } = useSelector(
    (state: RootState) => state.game
  );

  const cellsRows = [];
  for (let i = 11; i >= 0; i--) cellsRows.push(<CellsRow key={i} number={i} />);

  const pinsRows = [];
  for (let i = 11; i >= 0; i--) pinsRows.push(<PinsRow key={i} number={i} />);

  useEffect(() => {
    setScreenHeight(window.screen.availHeight);
  }, []);

  return (
    <div className={styles.board}>
      {isGameOver ? <RestartButton /> : <TurnTime key={activeCell.row} />}
      {screenHeight < 600 && (
        <div className={styles.returnBtn}>
          <ReturnButton />
        </div>
      )}
      <Cipher />
      <div className={styles.gameField}>
        <div className={styles.cellsField}>{cellsRows}</div>
        <div className={styles.pinsField}>{pinsRows}</div>
      </div>
    </div>
  );
};

export default Board;
