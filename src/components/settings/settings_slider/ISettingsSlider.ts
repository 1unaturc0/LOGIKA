export interface ISettingsSliderProps {
	content: {
		text: string;
		initialValue: number;
		minValue: number;
		maxValue: number;
		allowInfinity: boolean;
	};
	isActive: boolean;
	onChange: (turnTime: number) => void;
}
