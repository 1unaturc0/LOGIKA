import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { pagesContent } from "#/components/rules/rules_pages_content/rulesPagesContent";
import ReturnButton from "#/components/return_button/ReturnButton";
import RulesPage from "#/components/rules/rules_page/RulesPage";
import PageButton from "#/components/rules/page_button/PageButton";
import styles from "./Rules.module.css";

const Rules = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();

  const onPreviousButtonClick = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const onNextButtonClick = () => {
    if (currentPage < pagesContent.length - 1) setCurrentPage(currentPage + 1);
  };

  const pages = pagesContent.map((content, i) => (
    <RulesPage key={i} text={content.text} onClick={onNextButtonClick}>
      {content.illustration}
    </RulesPage>
  ));

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "s") onNextButtonClick();
      if (e.key === "ArrowUp" || e.key === "w") onPreviousButtonClick();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className={styles.rules}>
      <h1>{t("rules.title")}</h1>
      <div className={styles.returnBtn}>
        <ReturnButton />
      </div>
      {pages[currentPage]}
      <div className={styles.pageBtns}>
        <PageButton onClick={onPreviousButtonClick}>
          <FaChevronUp />
        </PageButton>
        {`${currentPage + 1}/${pages.length}`}
        <PageButton onClick={onNextButtonClick}>
          <FaChevronDown />
        </PageButton>
      </div>
    </div>
  );
};

export default Rules;
