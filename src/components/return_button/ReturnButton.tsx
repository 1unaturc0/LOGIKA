import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaSignOutAlt } from "react-icons/fa";
import { RootState } from "#/redux/store";
import { useActions } from "#/hooks/useActions";
import ModalWindow from "#/components/modal_window/ModalWindow";
import styles from "./ReturnButton.module.css";

const ReturnButton = () => {
	const [isModalShown, setIsModalShown] = useState(false);
	const { t } = useTranslation();
	const currentTab = useSelector((state: RootState) => state.tab.currentTab);
	const { changeTab } = useActions();

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (currentTab === "game" && e.key === "Escape") setIsModalShown(true);
			else if (e.key === "Escape") changeTab("game");
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [changeTab, currentTab]);

	return (
		<button
			onClick={() => {
				if (currentTab === "game") setIsModalShown(true);
				else changeTab("main");
			}}
			className={styles.returnBtn}
		>
			<FaSignOutAlt />
			{isModalShown && (
				<ModalWindow
					text={t("modalWindow.confirmReturn")}
					onConfirmButtonClick={() => changeTab("main")}
					onDeclineButtonClick={() => setIsModalShown(false)}
				/>
			)}
		</button>
	);
};

export default ReturnButton;
