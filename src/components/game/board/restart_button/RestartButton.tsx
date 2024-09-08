import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUndo } from "react-icons/fa";
import { RootState } from "#/redux/store";
import { useActions } from "#/hooks/useActions";
import { getInitializeGameData } from "#/utils/getInitializeGameData";
import styles from "./RestartButton.module.css";

const RestartButton = () => {
	const areEmptyCells = useSelector((state: RootState) => state.settings.areEmptyCells);
	const { initializeGame } = useActions();

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "r") initializeGame(getInitializeGameData(areEmptyCells));
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	});

	return (
		<button
			onClick={() => initializeGame(getInitializeGameData(areEmptyCells))}
			className={styles.restartBtn}
		>
			<FaUndo />
		</button>
	);
};

export default RestartButton;
