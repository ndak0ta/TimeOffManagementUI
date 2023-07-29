import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

interface TokenState {
  token: string | null;
}
  
const initialState: TokenState = {
  token: null,
};
  
  const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload;
      },
      clearToken: (state) => {
        state.token = null;
      },
    },
  });

const persistConfig = {
    key: "token",
    storage,
  };
  
  export const { setToken, clearToken } = tokenSlice.actions;
  
  export default persistReducer<TokenState>(persistConfig, tokenSlice.reducer);