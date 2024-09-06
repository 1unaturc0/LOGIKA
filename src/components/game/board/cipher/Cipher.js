import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Cell from "#/components/cell/Cell";
import styles from "./Cipher.module.css";

const Cipher = () => {
  const { cipher, isGameOver } = useSelector((state) => state.game);
  const coverRef = useRef(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.resolvedLanguage === "fi")
      coverRef.current.style.letterSpacing = "2px";
  });

  return (
    <div className={styles.cipher}>
      {!isGameOver && (
        <div ref={coverRef} className={styles.cover}>
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
