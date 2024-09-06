import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaCheck, FaXmark } from "react-icons/fa6";
import ModalWindowButton from "#/components/modal_window/modal_window_button/ModalWindowButton";
import styles from "./ModalWindow.module.css";

const ModalWindow = ({ text, onConfirmButtonClick, onDeclineButtonClick }) => {
  const [activeButton, setActiveButton] = useState(0);
  const modalWindowRef = useRef(null);

  const onKeyDown = (e) => {
    e.stopPropagation();
    if (
      e.key === "d" ||
      e.key === "ArrowRight" ||
      e.key === "a" ||
      e.key === "ArrowLeft"
    )
      setActiveButton(1 - activeButton);

    if (e.key === "Enter" || e.key === " " || e.key === "Escape")
      activeButton === 0 ? onConfirmButtonClick() : onDeclineButtonClick();
  };

  useEffect(() => modalWindowRef.current.focus(), []);

  return createPortal(
    <div
      ref={modalWindowRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={styles.modalWindow}
    >
      <div className={styles.content}>
        <h4>{text}</h4>
        <div className={styles.btns}>
          <ModalWindowButton
            type="confirm"
            active={activeButton === 0}
            onClick={(e) => {
              e.stopPropagation();
              onConfirmButtonClick();
            }}
          >
            <FaCheck />
          </ModalWindowButton>
          <ModalWindowButton
            type="decline"
            active={activeButton === 1}
            onClick={(e) => {
              e.stopPropagation();
              onDeclineButtonClick();
            }}
          >
            <FaXmark />
          </ModalWindowButton>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalWindow;
