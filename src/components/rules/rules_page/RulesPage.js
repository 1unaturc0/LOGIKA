import styles from "./RulesPage.module.css";

const RulesPage = ({ text, children }) => {
  return (
    <div className={styles.rulesPage}>
      <p>{text}</p>
      <div className={styles.illustration}>{children}</div>
    </div>
  );
};

export default RulesPage;
