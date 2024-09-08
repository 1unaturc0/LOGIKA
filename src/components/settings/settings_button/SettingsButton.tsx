import { useState, useEffect } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { isDesktopCheck } from "#/utils/isDesktopCheck";
import styles from "./SettingsButton.module.css";
import { ISettingsButtonProps } from "./ISettingsButon";

const SettingsButton = ({ content, isChecked, isActive, onClick }: ISettingsButtonProps) => {
	const [className, setClassName] = useState("");

	useEffect(() => {
		if (isActive && isDesktopCheck()) setClassName(`${styles.settingsBtn} ${styles.active}`);
		else setClassName(styles.settingsBtn);
	}, [isActive]);

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
			className={className}
			onClick={onClick}
		>
			{isChecked ? <FaCheck className={styles.icon} /> : <FaXmark className={styles.icon} />}
			<p>{content}</p>
		</button>
	);
};

export default SettingsButton;
