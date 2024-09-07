import i18n from "#/i18n";
import Cell from "#/components/cell/Cell";
import Pin from "#/components/pin/Pin";
import styles from "./rulesPagesContent.module.css";

const rulesPagesContent = [
  {
    text: "Guess the combination of 5 colored cells. There are 8 possible variations of colors.",
    illustration: (
      <div>
        <div className={styles.cellsList}>
          <Cell colorId={1} />
          <Cell colorId={2} />
          <Cell colorId={3} />
          <Cell colorId={4} />
        </div>
        <div className={styles.cellsList}>
          <Cell colorId={5} />
          <Cell colorId={6} />
          <Cell colorId={7} />
          <Cell colorId={8} />
        </div>
      </div>
    ),
  },
  {
    text: "You can make your assumptions up to 12 times. After each attempt you will see how close you are to the correct answer.",
    illustration: (
      <div className={styles.row}>
        <div className={styles.cellsRow}>
          <Cell colorId={4} />
          <Cell colorId={2} />
          <Cell colorId={3} />
          <Cell colorId={7} />
          <Cell colorId={2} />
        </div>
        <div className={styles.pinsRow}>
          <Pin colorId={2} />
          <Pin colorId={2} />
          <Pin colorId={2} />
          <Pin colorId={1} />
          <Pin colorId={0} />
        </div>
      </div>
    ),
  },
  {
    text: "White pin shows that you have guessed the color but not the position of one cell.",
    illustration: (
      <div className={styles.field}>
        <div className={styles.cellsRow}>
          <Cell colorId={0} />
          <Cell colorId={0} />
          <Cell colorId={0} />
          <Cell colorId={1} />
          <Cell colorId={1} />
        </div>
        <div className={styles.row}>
          <div className={styles.cellsRow}>
            <Cell colorId={1} />
            <Cell colorId={1} />
            <Cell colorId={1} />
            <Cell colorId={0} />
            <Cell colorId={0} />
          </div>
          <div className={styles.pinsRow}>
            <Pin colorId={1} />
            <Pin colorId={1} />
            <Pin colorId={0} />
            <Pin colorId={0} />
            <Pin colorId={0} />
          </div>
        </div>
      </div>
    ),
  },
  {
    text: "Black pin means that a cell has matched both by color and position.",
    illustration: (
      <div className={styles.field}>
        <div className={styles.cellsRow}>
          <Cell colorId={3} />
          <Cell colorId={3} />
          <Cell colorId={0} />
          <Cell colorId={0} />
          <Cell colorId={0} />
        </div>
        <div className={styles.row}>
          <div className={styles.cellsRow}>
            <Cell colorId={3} />
            <Cell colorId={3} />
            <Cell colorId={3} />
            <Cell colorId={0} />
            <Cell colorId={0} />
          </div>
          <div className={styles.pinsRow}>
            <Pin colorId={2} />
            <Pin colorId={2} />
            <Pin colorId={0} />
            <Pin colorId={0} />
            <Pin colorId={0} />
          </div>
        </div>
      </div>
    ),
  },
  {
    text: "Placements of pins do not correlate with placements of cells.",
    illustration: (
      <div className={styles.field}>
        <div className={styles.cellsRow}>
          <Cell colorId={0} />
          <Cell colorId={0} />
          <Cell colorId={5} />
          <Cell colorId={2} />
          <Cell colorId={0} />
        </div>
        <div className={styles.row}>
          <div className={styles.cellsRow}>
            <Cell colorId={0} />
            <Cell colorId={0} />
            <Cell colorId={0} />
            <Cell colorId={2} />
            <Cell colorId={5} />
          </div>
          <div className={styles.pinsRow}>
            <Pin colorId={2} />
            <Pin colorId={1} />
            <Pin colorId={0} />
            <Pin colorId={0} />
            <Pin colorId={0} />
          </div>
        </div>
      </div>
    ),
  },
];

const updatePagesTranslation = () =>
  rulesPagesContent.map(
    (content, i) => (content.text = i18n.t(`rules.pages.${i}`))
  );

i18n.on("initialized", () => {
  updatePagesTranslation();
  i18n.on("languageChanged", updatePagesTranslation);
});

export { rulesPagesContent as pagesContent };
