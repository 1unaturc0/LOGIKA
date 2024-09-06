import styles from "./ModalWindowButton.module.css";

const ModalWindowButton = ({ type, active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`
      ${styles.modalWindowBtn} \
      ${type === "confirm" ? styles.confirm : styles.decline} \
      ${active && styles.active}
    `}
    >
      {children}
    </button>
  );
};

export default ModalWindowButton;
