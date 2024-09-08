import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "#/hooks/useActions";
import { RootState } from "#/redux/store";
import { getInitializeGameData } from "#/utils/getInitializeGameData";
import Board from "#/components/game/board/Board";
import CellsMenu from "#/components/game/cells_menu/CellsMenu";
import styles from "./Game.module.css";

const Game = () => {
	const areEmptyCells = useSelector((state: RootState) => state.settings.areEmptyCells);
	const { initializeGame } = useActions();

	useEffect(() => {
		initializeGame(getInitializeGameData(areEmptyCells));
	}, [areEmptyCells, initializeGame]);

	return (
		<div className={styles.game}>
			<Board />
			<CellsMenu />
		</div>
	);
};

export default Game;
