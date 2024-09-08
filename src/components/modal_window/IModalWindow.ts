import React from "react";

export interface IModalWindowProps {
	text: string;
	onConfirmButtonClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
	onDeclineButtonClick: (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}
