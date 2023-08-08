import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../utils/Api/UserApi";


export const getUserInfoAndSetUserInfo = createAsyncThunk(
    "userInfo/getUserInfo",
    async (token: string) => {
        const user = await getUser(token);
        return user;
    }
);
