export interface IGameState {
	cipher: number[];
	cells: number[][];
	activeCell: {
		row: number;
		column: null | number;
	};
	isGameOver: boolean;
}
