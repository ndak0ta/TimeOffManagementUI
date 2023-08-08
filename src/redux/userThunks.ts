import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserAll } from "../utils/Api/UserApi";

export const getAllUserAndSetAllUser = createAsyncThunk(
    "user/getAllUser",
    async (token: string) => {
        const user = await getUserAll(token);
        return user;
    }
);