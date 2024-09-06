import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageButton.module.css";

const locales = [
  { code: "en", path: "images/flags/united_kingdom.png" },
  { code: "ru", path: "images/flags/russia.png" },
  { code: "fi", path: "images/flags/finland.png" },
];

const LanguageButton = ({ active }) => {
  const { i18n } = useTranslation();
  const currentLocaleIndex = locales.findIndex(
    (locale) => locale.code === i18n.resolvedLanguage
  );

  const onClick = () => {
    if (currentLocaleIndex < locales.length - 1)
      i18n.changeLanguage(locales[currentLocaleIndex + 1].code);
    if (currentLocaleIndex === locales.length - 1)
      i18n.changeLanguage(locales[0].code);
  };

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (e) => {
      if (
        (e.key === "d" ||
          e.key === "ArrowRight" ||
          e.key === "Enter" ||
          e.key === " ") &&
        currentLocaleIndex < locales.length - 1
      )
        i18n.changeLanguage(locales[currentLocaleIndex + 1].code);
      if (
        (e.key === "d" ||
          e.key === "ArrowRight" ||
          e.key === "Enter" ||
          e.key === " ") &&
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
      className={`
        ${styles.languageBtn} \
        ${active && styles.active}
      `}
    >
      <img src={locales[currentLocaleIndex].path} />
    </button>
  );
};

export default LanguageButton;
