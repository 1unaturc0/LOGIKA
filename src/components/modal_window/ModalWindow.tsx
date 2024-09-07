import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaCheck, FaXmark } from "react-icons/fa6";
import ModalWindowButton from "#/components/modal_window/modal_window_button/ModalWindowButton";
import styles from "./ModalWindow.module.css";
import { IModalWindowProps } from "./IModalWindow";

const ModalWindow = ({
  text,
  onConfirmButtonClick,
  onDeclineButtonClick,
}: IModalWindowProps) => {
  const [activeButton, setActiveButton] = useState(0);
  const modalWindowRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (
      e.key === "d" ||
      e.key === "ArrowRight" ||
      e.key === "a" ||
      e.key === "ArrowLeft"
    )
      setActiveButton(1 - activeButton);

    if (e.key === "Enter" || e.key === " " || e.key === "Escape")
      if (activeButton === 0) onConfirmButtonClick();
      else onDeclineButtonClick();
  };

  useEffect(() => modalWindowRef.current!.focus(), []);

  return createPortal(
    <div
      ref={modalWindowRef}
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        onDeclineButtonClick();
      }}
      onKeyDown={onKeyDown}
      className={styles.modalWindow}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.content}>
        <h4>{text}</h4>
        <div className={styles.btns}>
          <ModalWindowButton
            isConfirm={true}
            isActive={activeButton === 0}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onConfirmButtonClick();
            }}
          >
            <FaCheck />
          </ModalWindowButton>
          <ModalWindowButton
            isConfirm={false}
            isActive={activeButton === 1}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
