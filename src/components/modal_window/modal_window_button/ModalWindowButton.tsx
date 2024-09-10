import { useState, useLayoutEffect } from "react";
import { isDesktopCheck } from "#/utils/isDesktopCheck";
import styles from "./ModalWindowButton.module.css";
import { IModalWindowButtonProps } from "./IModalWindowButton";

const ModalWindowButton = ({ isConfirm, isActive, onClick, children }: IModalWindowButtonProps) => {
	const [activeClassName, setActiveClassName] = useState("");

	useLayoutEffect(() => {
		if (isActive && isDesktopCheck()) setActiveClassName(styles.active);
		else setActiveClassName("");
	}, [isActive, isConfirm]);

	return (
		<button
			onClick={onClick}
			className={`
				${styles.modalWindowBtn} \
				${isConfirm ? styles.confirm : styles.decline} \
				${activeClassName}`}
		>
			{children}
		</button>
	);
};

export default ModalWindowButton;
