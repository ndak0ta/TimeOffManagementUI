import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, getUserRole } from "../utils/Api/UserApi";


export const getUserInfoAndSetUserInfo = createAsyncThunk(
    "userInfo/getUserInfo",
    async (token: string) => {
        const user = await getUser(token);
        user.role = await getUserRole(token);
        return user;
    }
);