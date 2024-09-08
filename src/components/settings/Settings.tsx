import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useActions } from "#/hooks/useActions";
import SettingsButton from "#/components/settings/settings_button/SettingsButton";
import SettingsSlider from "#/components/settings/settings_slider/SettingsSlider";
import LanguageButton from "#/components/settings/language_button/LanguageButton";
import ReturnButton from "#/components/return_button/ReturnButton";
import styles from "./Settings.module.css";
import { RootState } from "#/redux/store";

const Settings = () => {
	const [activeSetting, setActiveSetting] = useState(0);
	const { areEmptyCells, isColorNumeration, turnTime } = useSelector(
		(state: RootState) => state.settings
	);
	const { toggleEmptyCells, toggleColorNumeration, changeTurnTime } = useActions();
	const { t } = useTranslation();

	const turnTimeSliderContent = {
		text: t("settings.turnTimeSlider"),
		minValue: 15,
		maxValue: 300,
		initialValue: turnTime / 1000,
		allowInfinity: true,
	};

	const onEmptyCellsButtonClick = () => {
		setActiveSetting(0);
		toggleEmptyCells();
	};

	const onColorNumerationButtonClick = () => {
		setActiveSetting(1);
		toggleColorNumeration();
	};

	const onTurnTimeSliderChange = (turnTime: number) => {
		setActiveSetting(2);
		changeTurnTime(turnTime * 1000);
	};

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			let newActiveSetting = activeSetting;
			if (activeSetting < 3 && (e.key === "s" || e.key === "ArrowDown")) newActiveSetting++;
			if (activeSetting === 3 && (e.key === "s" || e.key === "ArrowDown")) newActiveSetting = 0;
			if (activeSetting > 0 && (e.key === "w" || e.key === "ArrowUp")) newActiveSetting--;
			if (activeSetting === 0 && (e.key === "w" || e.key === "ArrowUp")) newActiveSetting = 3;
			setActiveSetting(newActiveSetting);
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [activeSetting]);

	return (
		<div className={styles.settings}>
			<h1>{t("settings.title")}</h1>
			<div className={styles.returnBtn}>
				<ReturnButton />
			</div>
			<div className={styles.settingsList}>
				<SettingsButton
					content={t("settings.emptyCellsButton")}
					isChecked={areEmptyCells}
					isActive={activeSetting === 0}
					onClick={onEmptyCellsButtonClick}
				/>
				<SettingsButton
					content={t("settings.colorNumerationButton")}
					isChecked={isColorNumeration}
					isActive={activeSetting === 1}
					onClick={onColorNumerationButtonClick}
				/>
				<SettingsSlider
					content={turnTimeSliderContent}
					isActive={activeSetting === 2}
					onChange={onTurnTimeSliderChange}
				/>
			</div>
			<LanguageButton isActive={activeSetting === 3} />
		</div>
	);
};

export default Settings;
