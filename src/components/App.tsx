import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RiEmotionSadLine } from "react-icons/ri";
import { useActions } from "#/hooks/useActions";
import { getCookie } from "#/utils/cookies";
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
			areEmptyCells: getCookie("areEmptyCells") === "true" ? true : false,
			isColorNumeration: getCookie("isColorNumeration") === "true" ? true : false,
			turnTime: getCookie("turnTime") === undefined ? Infinity : Number(getCookie("turnTime")),
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
