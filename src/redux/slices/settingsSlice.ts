import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	areEmptyCells: false,
	isColorNumeration: false,
	turnTime: Infinity,
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
		initializeSettings: (state, { payload: settings }) => {
			state.areEmptyCells = settings.areEmptyCells;
			state.isColorNumeration = settings.isColorNumeration;
			state.turnTime = settings.turnTime;
		},
	},
});

export const { actions, reducer } = settingsSlice;
