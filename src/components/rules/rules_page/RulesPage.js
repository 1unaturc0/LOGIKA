import styles from "./RulesPage.module.css";

const RulesPage = ({ text, onClick, children }) => {
  return (
    <div onClick={onClick} className={styles.rulesPage}>
      <p>{text}</p>
      <div className={styles.illustration}>{children}</div>
    </div>
  );
};

export default RulesPage;
