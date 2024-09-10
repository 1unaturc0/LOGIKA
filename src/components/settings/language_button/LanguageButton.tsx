import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isDesktopCheck } from "#/utils/isDesktopCheck";
import styles from "./LanguageButton.module.css";
import { ILanguageButtonProps } from "./ILanguageButton";

const locales = [
	{ code: "en", path: "images/flags/united_kingdom.png" },
	{ code: "ru", path: "images/flags/russia.png" },
	{ code: "fi", path: "images/flags/finland.png" },
];

const LanguageButton = ({ isActive }: ILanguageButtonProps) => {
	const [activeClassName, setActiveClassName] = useState("");
	const { i18n } = useTranslation();
	const currentLocaleIndex = locales.findIndex(locale => locale.code === i18n.resolvedLanguage);

	const onClick = () => {
		if (currentLocaleIndex < locales.length - 1)
			i18n.changeLanguage(locales[currentLocaleIndex + 1].code);
		if (currentLocaleIndex === locales.length - 1) i18n.changeLanguage(locales[0].code);
	};

	useEffect(() => {
		if (isActive && isDesktopCheck()) setActiveClassName(styles.active);
		else setActiveClassName("");
	}, [isActive]);

	useEffect(() => {
		if (!isActive) return;

		const onKeyDown = (e: KeyboardEvent) => {
			if (
				(e.key === "d" || e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") &&
				currentLocaleIndex < locales.length - 1
			)
				i18n.changeLanguage(locales[currentLocaleIndex + 1].code);
			if (
				(e.key === "d" || e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") &&
				currentLocaleIndex === locales.length - 1
			)
				i18n.changeLanguage(locales[0].code);
			if ((e.key === "a" || e.key === "ArrowLeft") && currentLocaleIndex > 0)
				i18n.changeLanguage(locales[currentLocaleIndex - 1].code);
			if ((e.key === "a" || e.key === "ArrowLeft") && currentLocaleIndex === 0)
				i18n.changeLanguage(locales[locales.length - 1].code);
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	});

	return (
		<button
			onClick={onClick}
			className={`${styles.languageBtn} ${activeClassName}`}
		>
			<img
				src={locales[currentLocaleIndex].path}
				alt={locales[currentLocaleIndex].code}
				width="70px"
			/>
		</button>
	);
};

export default LanguageButton;
