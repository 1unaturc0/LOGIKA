import { useSelector } from "react-redux";
import { useEffect } from "react";
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
  const currentTab = useSelector((state: RootState) => state.tab.currentTab);
  const { initializeSettings } = useActions();

  useEffect(() => {
    initializeSettings({
      areEmptyCells: getCookie("areEmptyCells") === "true" ? true : false,
      isColorNumeration:
        getCookie("isColorNumeration") === "true" ? true : false,
      turnTime:
        getCookie("turnTime") === undefined
          ? Infinity
          : Number(getCookie("turnTime")),
    });
  }, [initializeSettings]);

  return (
    <div className={styles.app}>
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
    </div>
  );
};

export default App;
