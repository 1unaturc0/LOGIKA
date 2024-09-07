import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Cell from "#/components/cell/Cell";
import { RootState } from "#/redux/store";
import styles from "./Cipher.module.css";

const Cipher = () => {
  const { cipher, isGameOver } = useSelector((state: RootState) => state.game);
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.cipher}>
      {!isGameOver && (
        <div
          style={i18n.resolvedLanguage === "fi" ? { letterSpacing: "2px" } : {}}
          className={styles.cover}
        >
          {t("game.cipher")}
        </div>
      )}
      {cipher.map((cell, i) => (
        <Cell key={i} colorId={cell} />
      ))}
    </div>
  );
};

export default Cipher;
