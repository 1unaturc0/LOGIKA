import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RiEmotionSadLine } from "react-icons/ri";
import { useActions } from "#/hooks/useActions";
import { RootState } from "#/redux/store";
import Header from "#/components/header/Header";
import Main from "#/components/main/Main";
import Settings from "#/components/settings/Settings";
import Rules from "#/components/rules/Rules";
import Game from "#/components/game/Game";
import styles from "./App.module.css";

const App = () => {
	const [screenSize, setScreenSize] = useState({
		width: Infinity,
		height: Infinity,
	});
	const currentTab = useSelector((state: RootState) => state.tab.currentTab);
	const { initializeSettings } = useActions();
	const { t } = useTranslation();

	useEffect(() => {
		initializeSettings({
			areEmptyCells: localStorage.getItem("areEmptyCells") === "true" ? true : false,
			isColorNumeration: localStorage.getItem("isColorNumeration") === "true" ? true : false,
			turnTime: localStorage.getItem("turnTime")
				? Number(localStorage.getItem("turnTime"))
				: Infinity,
			rowsAmount: localStorage.getItem("rowsAmount")
				? Number(localStorage.getItem("rowsAmount"))
				: 12,
		});
	}, [initializeSettings]);

	useEffect(() => {
		setScreenSize({
			width: window.screen.availWidth,
			height: window.screen.availHeight,
		});
	}, []);

	return (
		<div className={styles.app}>
			{screenSize.width >= 310 && screenSize.height >= 550 ? (
				<>
					<Header />
					{currentTab === "game" ? (
						<Game />
					) : (
						<div className={styles.menu}>
							{currentTab === "main" && <Main />}
							{currentTab === "settings" && <Settings />}
							{currentTab === "rules" && <Rules />}
						</div>
					)}
				</>
			) : (
				<div className={styles.smallScreen}>
					<h4>{t("smallScreen")}</h4>
					<RiEmotionSadLine className={styles.smallScreenIcon} />
				</div>
			)}
		</div>
	);
};

export default App;
