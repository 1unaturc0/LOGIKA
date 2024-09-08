import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "#/hooks/useActions";
import Cell from "#/components/cell/Cell";
import ConfirmRowButton from "#/components/game/board/cells_row/confirm_row_button/ConfirmRowButton";
import { RootState } from "#/redux/store";
import styles from "./CellsRow.module.css";
import { ICellsRowProps } from "./ICellsRow";

const CellsRow = ({ number }: ICellsRowProps) => {
	const { cells, activeCell, isGameOver } = useSelector((state: RootState) => state.game);
	const { changeActiveCell } = useActions();

	const onCellClick = (row: number, column: number) => {
		if (row === activeCell.row) changeActiveCell({ row, column });
	};

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (activeCell.column === null && (e.key === "d" || e.key === "ArrowRight"))
				changeActiveCell({ row: activeCell.row, column: 0 });
			if (
				activeCell.column !== null &&
				activeCell.column < 4 &&
				(e.key === "d" || e.key === "ArrowRight")
			)
				changeActiveCell({
					row: activeCell.row,
					column: activeCell.column + 1,
				});
			if (activeCell.column === null && (e.key === "a" || e.key === "ArrowLeft"))
				changeActiveCell({ row: activeCell.row, column: 4 });
			if (
				activeCell.column !== null &&
				activeCell.column > 0 &&
				(e.key === "a" || e.key === "ArrowLeft")
			)
				changeActiveCell({
					row: activeCell.row,
					column: activeCell.column - 1,
				});
			if (activeCell.column === 4 && (e.key === "d" || e.key === "ArrowRight"))
				changeActiveCell({ row: activeCell.row, column: null });
			if (activeCell.column === 0 && (e.key === "a" || e.key === "ArrowLeft"))
				changeActiveCell({ row: activeCell.row, column: null });
			if (activeCell.column !== null && (e.key === "Enter" || e.key === "w" || e.key === "ArrowUp"))
				changeActiveCell({ row: activeCell.row, column: null });
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [changeActiveCell, activeCell.row, activeCell.column]);

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
			{activeCell.row === number && !isGameOver && <ConfirmRowButton />}
		</div>
	);
};

export default CellsRow;
