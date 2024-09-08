import { IPinProps } from "./IPin";
import styles from "./Pin.module.css";

const pinColors = ["empty", "white", "black"];

const Pin = ({ colorId }: IPinProps) => {
	return (
		<div
			className={`
                ${styles.pin} \
                ${styles[pinColors[colorId] as keyof typeof styles]}
            `}
		/>
	);
};

export default Pin;
