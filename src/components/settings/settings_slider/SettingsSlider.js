import { useState, useRef, useEffect } from "react";
import { isDesktopCheck } from "#/utils/isDesktopCheck";
import styles from "./SettingsSlider.module.css";

const SettingsSlider = ({ content, active, onChange }) => {
  const [value, setValue] = useState(content.initialValue);
  const [className, setClassName] = useState("");
  const minEndRef = useRef(null);
  const maxEndRef = useRef(null);
  const infinityRef = useRef(null);
  const gripRef = useRef(null);

  const valueRange = content.maxValue - content.minValue;

  const onDragStart = (e) => {
    const isDesktop = isDesktopCheck();
    const clientX = e.clientX ?? e.touches[0].clientX;

    const minEnd = minEndRef.current;
    const maxEnd = maxEndRef.current;
    const endsRange =
      maxEnd.getBoundingClientRect().right -
      minEnd.getBoundingClientRect().left;

    const infinityCenter =
      infinityRef.current.offsetLeft + infinityRef.current.offsetWidth / 2;

    const grip = gripRef.current;
    const gripRadius = grip.offsetWidth / 2;

    const minGripLeft = minEnd.offsetWidth / 2 - gripRadius;
    const maxGripLeft = endsRange - gripRadius - maxEnd.offsetWidth / 2;
    const sliderRange = maxGripLeft - minGripLeft;
    const shift = clientX - grip.getBoundingClientRect().left;
    const gripCenter = grip.offsetLeft + gripRadius;

    const onDragMove = (e) => {
      const clientX = e.clientX ?? e.touches[0].clientX;
      let newGripLeft = clientX - minEnd.getBoundingClientRect().left - shift;
      if (newGripLeft < minGripLeft) newGripLeft = minGripLeft;
      if (
        newGripLeft > maxGripLeft &&
        newGripLeft < endsRange + (infinityCenter - gripCenter) / 3
      )
        newGripLeft = maxGripLeft;
      if (newGripLeft > endsRange + (infinityCenter - gripCenter) / 3)
        newGripLeft = infinityCenter - gripRadius;
      grip.style.left = `${newGripLeft}px`;
    };

    const onDragEnd = () => {
      let newValue = Math.round(
        content.minValue +
          (valueRange / sliderRange) * (grip.offsetLeft - minGripLeft)
      );
      if (newValue > content.maxValue) newValue = Infinity;
      setValue(newValue);
      onChange(newValue);
      document.onmousemove = null;
      document.onmouseup = null;
      document.ontouchmove = null;
      document.ontouchend = null;
    };

    if (isDesktop) {
      document.onmousemove = onDragMove;
      document.onmouseup = onDragEnd;
    } else {
      document.ontouchmove = onDragMove;
      document.ontouchend = onDragEnd;
    }
  };

  useEffect(() => {
    if (active && isDesktopCheck())
      setClassName(`${styles.settingsSlider} ${styles.active}`);
    else setClassName(styles.settingsSlider);
  }, [active]);

  useEffect(() => {
    const isDesktop = isDesktopCheck();

    if (isDesktop) gripRef.current.onmousedown = onDragStart;
    else gripRef.current.ontouchstart = onDragStart;
  });

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (e) => {
      const step = 5;
      let newValue = value;
      if (e.key === "d" || e.key === "ArrowRight") {
        newValue =
          content.maxValue - value < step ? content.maxValue : value + step;
        if (value >= content.maxValue) newValue = Infinity;
        setValue(newValue);
        onChange(newValue);
      }
      if (e.key === "a" || e.key === "ArrowLeft") {
        newValue =
          value - content.minValue < step ? content.minValue : value - step;
        if (value > content.maxValue) newValue = content.maxValue;
        setValue(newValue);
        onChange(newValue);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    const minEnd = minEndRef.current;
    const maxEnd = maxEndRef.current;
    const endsRange =
      maxEnd.getBoundingClientRect().right -
      minEnd.getBoundingClientRect().left;

    const infinityCenter =
      infinityRef.current.offsetLeft + infinityRef.current.offsetWidth / 2;

    const grip = gripRef.current;
    const gripRadius = grip.offsetWidth / 2;

    const minGripLeft = minEnd.offsetWidth / 2 - gripRadius;
    const maxGripLeft = endsRange - gripRadius - maxEnd.offsetWidth / 2;
    const sliderRange = maxGripLeft - minGripLeft;
    const initialGripLeft =
      minGripLeft + (sliderRange / valueRange) * (value - content.minValue);

    grip.style.left =
      content.initialValue === Infinity
        ? `${infinityCenter - gripRadius}px`
        : `${initialGripLeft}px`;
  });

  return (
    <div className={className}>
      <p>
        {content.text}
        {value === Infinity ? "Ꝏ" : value}
      </p>
      <div className={styles.line}>
        <div className={styles.ends}>
          <div ref={minEndRef} className={styles.end}>
            <span>{content.minValue}</span>
          </div>
          <div ref={maxEndRef} className={styles.end}>
            <span>{content.maxValue}</span>
          </div>
        </div>
        <div ref={gripRef} className={styles.grip} />
        {content.allowInfinity && (
          <div ref={infinityRef} className={styles.infinity}>
            <span>Ꝏ</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsSlider;
