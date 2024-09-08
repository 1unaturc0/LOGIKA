import { useEffect } from "react";
import { useActions } from "#/hooks/useActions";
import Cell from "#/components/cell/Cell";
import styles from "./CellsMenu.module.css";

const CellsMenu = () => {
	const { changeCellColor } = useActions();

	const cells = [];
	for (let i = 0; i < 9; i++)
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
