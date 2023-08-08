import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../utils/Interfaces";
import { getAllUserAndSetAllUser } from "./userThunks";


export interface UserState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

const setLoadingAndClearError = (state: UserState) => {
    state.loading = true;
    state.error = null;
};
  
const setAllUserAndClearLoading = (state: UserState, action: any) => {
    state.user = action.payload;
    state.loading = false;
};
  
const setErrorAndClearLoading = (state: UserState, action: any) => {
    state.error = action.error.message;
    state.loading = false;
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllUserAndSetAllUser.pending, setLoadingAndClearError)
        .addCase(getAllUserAndSetAllUser.fulfilled, setAllUserAndClearLoading)
        .addCase(getAllUserAndSetAllUser.rejected, setErrorAndClearLoading);
    }
});

export default userSlice.reducer;