import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { getTokenAndSetToken } from "./tokenThunks";
import exp from "constants";

interface TokenState {
  token: string | null;
  loading?: boolean;
  error?: string | null;
}

const initialState: TokenState = {
  token: null,
  loading: true,
  error: null,
};

const setLoadingAndClearError = (state: TokenState) => {
  state.loading = true;
  state.error = null;
};

const setTokenAndClearLoading = (state: TokenState, action: any) => {
  state.token = action.payload;
  state.loading = false;
};

const setErrorAndClearLoading = (state: TokenState, action: any) => {
  state.error = action.error.message;
  state.loading = false;
};
  
const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
      clearToken: (state) => {
        state.token = null;
      }
    },
    extraReducers: (builder) => {
      builder
      .addCase(getTokenAndSetToken.pending, setLoadingAndClearError)
      .addCase(getTokenAndSetToken.fulfilled, setTokenAndClearLoading)
      .addCase(getTokenAndSetToken.rejected, setErrorAndClearLoading);
    }
  });

const persistConfig = {
    key: "token",
    storage,
  };
  
export const { clearToken } = tokenSlice.actions;

export default persistReducer<TokenState>(persistConfig, tokenSlice.reducer);