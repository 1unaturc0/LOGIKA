import styles from "./Pin.module.css";

const pinColors = ["empty", "white", "black"];

const Pin = ({ colorId }) => {
  return (
    <div
      className={`
                ${styles.pin} \
                ${styles[pinColors[colorId]]}
            `}
    />
  );
};

export default Pin;
