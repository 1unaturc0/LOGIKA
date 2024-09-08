import { useState, useRef, useEffect } from "react";
import { isDesktopCheck } from "#/utils/isDesktopCheck";
import styles from "./SettingsSlider.module.css";
import { ISettingsSliderProps } from "./ISettingsSlider";

const SettingsSlider = ({ content, isActive, onChange }: ISettingsSliderProps) => {
	const [value, setValue] = useState(content.initialValue);
	const [className, setClassName] = useState("");
	const minEndRef = useRef<HTMLDivElement>(null);
	const maxEndRef = useRef<HTMLDivElement>(null);
	const infinityRef = useRef<HTMLDivElement>(null);
	const gripRef = useRef<HTMLDivElement>(null);

	const valueRange = content.maxValue - content.minValue;

	useEffect(() => {
		if (isActive && isDesktopCheck()) setClassName(`${styles.settingsSlider} ${styles.active}`);
		else setClassName(styles.settingsSlider);
	}, [isActive]);

	useEffect(() => {
		const isDesktop = isDesktopCheck();
		let newValue = value;

		const onDragStart = (e: MouseEvent | TouchEvent) => {
			const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

			const minEnd = minEndRef.current!;
			const maxEnd = maxEndRef.current!;
			const endsRange = maxEnd.getBoundingClientRect().right - minEnd.getBoundingClientRect().left;

			const infinityCenter = content.allowInfinity
				? infinityRef.current!.offsetLeft + infinityRef.current!.offsetWidth / 2
				: maxEnd.getBoundingClientRect().left + maxEnd.offsetWidth;

			const grip = gripRef.current!;
			const gripRadius = grip.offsetWidth / 2;

			const minGripLeft = minEnd.offsetWidth / 2 - gripRadius;
			const maxGripLeft = endsRange - gripRadius - maxEnd.offsetWidth / 2;
			const sliderRange = maxGripLeft - minGripLeft;
			const shift = clientX - grip.getBoundingClientRect().left;
			const gripCenter = grip.offsetLeft + gripRadius;

			const onDragMove = (e: MouseEvent | TouchEvent) => {
				const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
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

				newValue = Math.round(
					content.minValue + (valueRange / sliderRange) * (grip.offsetLeft - minGripLeft)
				);
				if (newValue > content.maxValue) newValue = Infinity;
				setValue(newValue);
			};

			const onDragEnd = () => {
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

		if (isDesktop) gripRef.current!.onmousedown = onDragStart;
		else gripRef.current!.ontouchstart = onDragStart;
	});

	useEffect(() => {
		if (!isActive) return;

		const onKeyDown = (e: KeyboardEvent) => {
			const step = 5;
			let newValue = value;
			if (e.key === "d" || e.key === "ArrowRight") {
				newValue = content.maxValue - value < step ? content.maxValue : value + step;
				if (value >= content.maxValue) newValue = Infinity;
				setValue(newValue);
				onChange(newValue);
			}
			if (e.key === "a" || e.key === "ArrowLeft") {
				newValue = value - content.minValue < step ? content.minValue : value - step;
				if (value > content.maxValue) newValue = content.maxValue;
				setValue(newValue);
				onChange(newValue);
			}
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	});

	useEffect(() => {
		const minEnd = minEndRef.current!;
		const maxEnd = maxEndRef.current!;
		const endsRange = maxEnd.getBoundingClientRect().right - minEnd.getBoundingClientRect().left;

		const infinityCenter = content.allowInfinity
			? infinityRef.current!.offsetLeft + infinityRef.current!.offsetWidth / 2
			: maxEnd.getBoundingClientRect().left + maxEnd.offsetWidth;

		const grip = gripRef.current!;
		const gripRadius = grip.offsetWidth / 2;

		const minGripLeft = minEnd.offsetWidth / 2 - gripRadius;
		const maxGripLeft = endsRange - gripRadius - maxEnd.offsetWidth / 2;
		const sliderRange = maxGripLeft - minGripLeft;
		const initialGripLeft = minGripLeft + (sliderRange / valueRange) * (value - content.minValue);

		grip.style.left =
			content.initialValue === Infinity
				? `${infinityCenter - gripRadius}px`
				: `${initialGripLeft}px`;
	}, [content.initialValue, content.minValue, value, valueRange, content.allowInfinity]);

	return (
		<div className={className}>
			<p>
				{content.text}
				{value === Infinity ? "Ꝏ" : value}
			</p>
			<div className={styles.line}>
				<div className={styles.ends}>
					<div
						ref={minEndRef}
						className={styles.end}
					>
						<span>{content.minValue}</span>
					</div>
					<div
						ref={maxEndRef}
						className={styles.end}
					>
						<span>{content.maxValue}</span>
					</div>
				</div>
				<div
					ref={gripRef}
					className={styles.grip}
				/>
				{content.allowInfinity && (
					<div
						ref={infinityRef}
						className={styles.infinity}
					>
						<span>Ꝏ</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default SettingsSlider;
