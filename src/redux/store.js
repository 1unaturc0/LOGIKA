import { configureStore } from "@reduxjs/toolkit";
import { reducer as tabReducer } from "#/redux/slices/tabSlice";
import { reducer as settingsReducer } from "#/redux/slices/settingsSlice";
import { reducer as gameReducer } from "#/redux/slices/gameSlice";

export const store = configureStore({
  reducer: {
    tab: tabReducer,
    settings: settingsReducer,
    game: gameReducer,
  },
  devTools: true,
});
