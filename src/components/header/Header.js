import { useSelector } from "react-redux";
import ReturnButton from "#/components/return_button/ReturnButton";
import Cell from "#/components/cell/Cell";
import styles from "./Header.module.css";

const Header = () => {
  const currentTab = useSelector((state) => state.tab.currentTab);

  return (
    <header className={styles.header}>
      {currentTab === "game" && (
        <div className={styles.returnBtn}>
          <ReturnButton />
        </div>
      )}
      <h1>LOGIKA</h1>
      <span>
        <Cell colorId={1} />
        <Cell colorId={2} />
        <Cell colorId={3} />
      </span>
    </header>
  );
};

export default Header;
