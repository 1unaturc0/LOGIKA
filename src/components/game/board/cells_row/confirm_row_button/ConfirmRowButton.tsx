import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import { useActions } from "#/hooks/useActions";
import { RootState } from "#/redux/store";
import styles from "./ConfirmRowButton.module.css";

const ConfirmRowButton = () => {
	const { activeCell } = useSelector((state: RootState) => state.game);
	const { confirmRow } = useActions();

	useEffect(() => {
		if (activeCell.column !== null) return;

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Enter" || e.key === "w" || e.key === "ArrowUp") confirmRow();
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [confirmRow, activeCell.column]);

	return (
		<button
			onClick={() => confirmRow()}
			className={`
        ${styles.confirmRowBtn} \
        ${activeCell.column === null && styles.active}
      `}
		>
			<FaCheck className={styles.icon} />
		</button>
	);
};

export default ConfirmRowButton;
