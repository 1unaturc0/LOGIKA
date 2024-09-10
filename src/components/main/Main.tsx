import { useState, useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaCog, FaPlay, FaScroll } from "react-icons/fa";
import { useActions } from "#/hooks/useActions";
import { isDesktopCheck } from "#/utils/isDesktopCheck";
import MainButton from "#/components/main/main_button/MainButton";
import styles from "./Main.module.css";
import ModalWindow from "../modal_window/ModalWindow";
import { clearGameData } from "#/utils/clearGameData";

const Main = () => {
	const [isModalShown, setIsModalShown] = useState(false);
	const [activeButton, setActiveButton] = useState(1);
	const { changeTab } = useActions();
	const { t } = useTranslation();
	const [activeIconClassName, setActiveIconClassName] = useState(styles.icon);

	useLayoutEffect(() => {
		if (isDesktopCheck()) setActiveIconClassName(styles.activeIcon);
	}, []);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			let newActiveButton = activeButton;
			if (activeButton < 2 && (e.key === "d" || e.key === "ArrowRight")) newActiveButton++;
			if (activeButton === 2 && (e.key === "d" || e.key === "ArrowRight")) newActiveButton = 0;
			if (activeButton > 0 && (e.key === "a" || e.key === "ArrowLeft")) newActiveButton--;
			if (activeButton === 0 && (e.key === "a" || e.key === "ArrowLeft")) newActiveButton = 2;
			setActiveButton(newActiveButton);
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [activeButton]);

	return (
		<nav className={styles.main}>
			<MainButton
				content={t("main.settingsButton")}
				isActive={activeButton === 0}
				onClick={() => changeTab("settings")}
			>
				<FaCog className={activeButton === 0 ? activeIconClassName : styles.icon} />
			</MainButton>
			<MainButton
				content={t("main.playButton")}
				isActive={activeButton === 1}
				onClick={() => {
					if (localStorage.getItem("cipher") === null) changeTab("game");
					else setIsModalShown(true);
				}}
			>
				<FaPlay className={activeButton === 1 ? activeIconClassName : styles.icon} />
			</MainButton>
			<MainButton
				content={t("main.rulesButton")}
				isActive={activeButton === 2}
				onClick={() => changeTab("rules")}
			>
				<FaScroll className={activeButton === 2 ? activeIconClassName : styles.icon} />
			</MainButton>
			{isModalShown && (
				<ModalWindow
					text={t("modalWindow.confirmContinue")}
					onConfirmButtonClick={() => {
						changeTab("game");
					}}
					onDeclineButtonClick={() => {
						clearGameData();
						changeTab("game");
					}}
				/>
			)}
		</nav>
	);
};

export default Main;
