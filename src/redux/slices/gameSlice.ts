import { createSlice } from "@reduxjs/toolkit";
import { IGameState } from "#/redux/slices/interfaces/IGameSlice";

const initialState: IGameState = {
	cipher: [0, 0, 0, 0, 0],
	cells: [
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
	],
	activeCell: {
		row: 0,
		column: 0,
	},
	isGameOver: false,
};

export const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		createCipher: (state, { payload: cipher }) => {
			state.cipher = cipher;
		},
		changeActiveCell: (state, { payload: activeCell }) => {
			state.activeCell = activeCell;
		},
		confirmRow: state => {
			if (
				JSON.stringify(state.cells[state.activeCell.row]) !== JSON.stringify(state.cipher) &&
				state.activeCell.row !== 11
			) {
				state.activeCell.row++;
				state.activeCell.column = 0;
			} else {
				state.activeCell.column = null;
				state.isGameOver = true;
			}
		},
		changeCellColor: (state, { payload: colorId }) => {
			if (state.activeCell.column !== null) {
				state.cells[state.activeCell.row][state.activeCell.column] = colorId;
				state.activeCell.column = state.activeCell.column < 4 ? state.activeCell.column + 1 : null;
			}
		},
		initializeGame: (state, { payload }) => {
			state.cipher = payload.cipher;
			state.cells = payload.cells;
			state.activeCell = {
				row: payload.activeRow,
				column: 0,
			};
			state.isGameOver = false;
		},
		reachedLockedRow: state => {
			state.activeCell.row--;
			state.activeCell.column = null;
			state.isGameOver = true;
		},
	},
});

export const { actions, reducer } = gameSlice;
