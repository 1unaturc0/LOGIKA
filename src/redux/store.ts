import { configureStore, isAnyOf } from "@reduxjs/toolkit";
import { listenerMiddleware, startAppListening } from "./listenerMiddleware";
import { reducer as tabReducer } from "#/redux/slices/tabSlice";
import {
	reducer as settingsReducer,
	actions as settingsActions,
} from "#/redux/slices/settingsSlice";
import { reducer as gameReducer, actions as gameActions } from "#/redux/slices/gameSlice";
import { clearGameData } from "#/utils/clearGameData";

startAppListening({
	matcher: isAnyOf(settingsActions.toggleEmptyCells, settingsActions.changeTurnTime),
	effect: clearGameData,
});

startAppListening({
	actionCreator: settingsActions.toggleEmptyCells,
	effect: (action, listenerApi) =>
		localStorage.setItem("areEmptyCells", String(listenerApi.getState().settings.areEmptyCells)),
});

startAppListening({
	actionCreator: settingsActions.toggleColorNumeration,
	effect: (action, listenerApi) =>
		localStorage.setItem(
			"isColorNumeration",
			String(listenerApi.getState().settings.isColorNumeration)
		),
});

startAppListening({
	actionCreator: settingsActions.changeTurnTime,
	effect: action => localStorage.setItem("turnTime", action.payload),
});

startAppListening({
	actionCreator: gameActions.initializeGame,
	effect: action => localStorage.setItem("cipher", JSON.stringify(action.payload.cipher)),
});

startAppListening({
	actionCreator: gameActions.changeCellColor,
	effect: (action, listenerApi) =>
		localStorage.setItem("cells", JSON.stringify(listenerApi.getState().game.cells)),
});

startAppListening({
	actionCreator: gameActions.confirmRow,
	effect: (action, listenerApi) => {
		localStorage.setItem("activeRow", String(listenerApi.getState().game.activeCell.row));
		if (listenerApi.getState().game.isGameOver) clearGameData();
	},
});

export const store = configureStore({
	reducer: {
		tab: tabReducer,
		settings: settingsReducer,
		game: gameReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
