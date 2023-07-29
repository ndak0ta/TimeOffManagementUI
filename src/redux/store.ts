import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import userInfoReducer from "./userInfoReducer";
import tokenReducer from "./tokenReducer";
import timeOffReducer from "./timeOffReducer";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    userInfo: userInfoReducer,
    timeOff: timeOffReducer,
  }
});

const persistor = persistStore(store);

export { store, persistor };

export type AppDispatch = typeof store.dispatch;
