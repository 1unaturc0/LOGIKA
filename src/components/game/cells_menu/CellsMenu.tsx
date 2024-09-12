import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "#/hooks/useActions";
import { RootState } from "#/redux/store";
import Cell from "#/components/cell/Cell";
import styles from "./CellsMenu.module.css";

const CellsMenu = () => {
	const areEmptyCells = useSelector((state: RootState) => state.settings.areEmptyCells);
	const { changeCellColor } = useActions();

	const cells = [];
	cells.push(
		<Cell
			key={0}
			colorId={0}
			isActive={areEmptyCells ? true : false}
			onClick={() => changeCellColor(0)}
		/>
	);
	for (let i = 1; i < 9; i++)
		cells.push(
			<Cell
				key={i}
				colorId={i}
				onClick={() => changeCellColor(i)}
			/>
		);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			const colorId = e.key === "Backspace" ? 0 : Number(e.key);
			if (colorId < 9) changeCellColor(colorId);
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [changeCellColor]);

	return (
		<div className={styles.cellsMenu}>
			<div className={styles.cells}>{cells}</div>
		</div>
	);
};

export default CellsMenu;
