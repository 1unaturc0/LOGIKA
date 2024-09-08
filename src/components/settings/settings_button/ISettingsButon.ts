import React from "react";

export interface ISettingsButtonProps {
	content: string;
	isChecked: boolean;
	isActive: boolean;
	onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}
