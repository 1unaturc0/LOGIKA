import { useEffect } from "react";
import styles from "./MainButton.module.css";
import { IMainButton } from "./IMainButton";

const MainButton = ({ content, isActive, onClick, children }: IMainButton) => {
	useEffect(() => {
		if (!isActive) return;

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") onClick();
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	});

	return (
		<button
			className={`
                ${styles.mainBtn} \
                ${isActive && styles.active}
            `}
			onClick={onClick}
		>
			{children}
			{content}
		</button>
	);
};

export default MainButton;
