import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useActions } from "#/hooks/useActions";
import { RootState } from "#/redux/store";
import styles from "./TurnTime.module.css";

const TurnTime = () => {
	const turnTime = useSelector((state: RootState) => state.settings.turnTime);
	const { confirmRow } = useActions();

	const [timeLeft, setTimeLeft] = useState(turnTime);
	const progressRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const percentage = turnTime === Infinity ? 0 : 100 - (100 / turnTime) * timeLeft;

		const greenValue = 176 - (176 / 150) * percentage;
		const blueValue = 63 - (63 / 150) * percentage;

		const intervalId = setInterval(() => {
			if (turnTime === Infinity) return clearInterval(intervalId);
			if (timeLeft > 0) return setTimeLeft(timeLeft - 100);
			setTimeLeft(turnTime);
			confirmRow();
		}, 100);

		progressRef.current!.style.background = `conic-gradient(
                rgb(213, ${greenValue}, ${blueValue}) ${percentage}%, \
                transparent 0
            )`;

		return () => clearInterval(intervalId);
	});

	return (
		<div className={styles.turnTime}>
			<div
				ref={progressRef}
				className={styles.progress}
			/>
			<span>{timeLeft === Infinity ? "Ꝏ" : Math.ceil(timeLeft / 1000)}</span>
		</div>
	);
};

export default TurnTime;
