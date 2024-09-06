import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaCog, FaPlay, FaScroll } from "react-icons/fa";
import { useActions } from "#/hooks/useActions";
import MainButton from "#/components/main/main_button/MainButton";
import styles from "./Main.module.css";

const Main = () => {
  const [activeButton, setActiveButton] = useState(1);
  const { changeTab } = useActions();
  const { t } = useTranslation();

  useEffect(() => {
    const onKeyDown = (e) => {
      let newActiveButton = activeButton;
      if (activeButton < 2 && (e.key === "d" || e.key === "ArrowRight"))
        newActiveButton++;
      if (activeButton === 2 && (e.key === "d" || e.key === "ArrowRight"))
        newActiveButton = 0;
      if (activeButton > 0 && (e.key === "a" || e.key === "ArrowLeft"))
        newActiveButton--;
      if (activeButton === 0 && (e.key === "a" || e.key === "ArrowLeft"))
        newActiveButton = 2;
      setActiveButton(newActiveButton);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <nav className={styles.main}>
      <MainButton
        content={t("main.settingsButton")}
        active={activeButton === 0}
        onClick={() => changeTab("settings")}
      >
        <FaCog
          className={activeButton === 0 ? styles.activeIcon : styles.icon}
        />
      </MainButton>
      <MainButton
        content={t("main.playButton")}
        active={activeButton === 1}
        onClick={() => changeTab("game")}
      >
        <FaPlay
          className={activeButton === 1 ? styles.activeIcon : styles.icon}
        />
      </MainButton>
      <MainButton
        content={t("main.rulesButton")}
        active={activeButton === 2}
        onClick={() => changeTab("rules")}
      >
        <FaScroll
          className={activeButton === 2 ? styles.activeIcon : styles.icon}
        />
      </MainButton>
    </nav>
  );
};

export default Main;
