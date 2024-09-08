import { useState, useEffect } from "react";
import { isDesktopCheck } from "#/utils/isDesktopCheck";
import styles from "./ModalWindowButton.module.css";
import { IModalWindowButtonProps } from "./IModalWindowButton";

const ModalWindowButton = ({ isConfirm, isActive, onClick, children }: IModalWindowButtonProps) => {
	const [className, setClassName] = useState("");

	useEffect(() => {
		if (isActive && isDesktopCheck())
			setClassName(`
        ${styles.modalWindowBtn} \
        ${isConfirm ? styles.confirm : styles.decline} \
        ${styles.active}
      `);
		else
			setClassName(`
        ${styles.modalWindowBtn} \
        ${isConfirm ? styles.confirm : styles.decline}
      `);
	}, [isActive, isConfirm]);

	return (
		<button
			onClick={onClick}
			className={className}
		>
			{children}
		</button>
	);
};

export default ModalWindowButton;
