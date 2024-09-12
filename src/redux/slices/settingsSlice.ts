import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	areEmptyCells: false,
	isColorNumeration: false,
	turnTime: Infinity,
	rowsAmount: 12,
};

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		toggleEmptyCells: state => {
			state.areEmptyCells = !state.areEmptyCells;
		},
		toggleColorNumeration: state => {
			state.isColorNumeration = !state.isColorNumeration;
		},
		changeTurnTime: (state, { payload: turnTime }) => {
			state.turnTime = turnTime;
		},
		changeRowsAmount: (state, { payload: rowsAmount }) => {
			state.rowsAmount = rowsAmount;
		},
		initializeSettings: (state, { payload: settings }) => {
			state.areEmptyCells = settings.areEmptyCells;
			state.isColorNumeration = settings.isColorNumeration;
			state.turnTime = settings.turnTime;
			state.rowsAmount = settings.rowsAmount;
		},
	},
});

export const { actions, reducer } = settingsSlice;
