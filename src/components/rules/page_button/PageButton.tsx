import { IPageButtonProps } from "./IPageButton";
import styles from "./PageButton.module.css";

const PageButton = ({ onClick, children }: IPageButtonProps) => {
  return (
    <button onClick={onClick} className={styles.pageBtn}>
      {children}
    </button>
  );
};

export default PageButton;
