import { createSlice } from "@reduxjs/toolkit";
import { IUserInfo } from "../utils/Interfaces";
import { getUserInfoAndSetUserInfo } from "./userInfoThunks";


export interface UserInfoState {
    user: IUserInfo | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserInfoState = {
    user: null,
    loading: true,
    error: null,
};

const userSlice = createSlice({
    name: "useInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserInfoAndSetUserInfo.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserInfoAndSetUserInfo.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })
        .addCase(getUserInfoAndSetUserInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? null;
        });
    }   
});

export default userSlice.reducer;