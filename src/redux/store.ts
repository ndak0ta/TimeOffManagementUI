import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import userInfoReducer from "./userInfoReducer";
import tokenReducer from "./tokenReducer";
import timeOffReducer from "./timeOffReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    userInfo: userInfoReducer,
    timeOff: timeOffReducer,
  }
});

const persistor = persistStore(store);

export { store, persistor };

export type AppDispatch = typeof store.dispatch;
