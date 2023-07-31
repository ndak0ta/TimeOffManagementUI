import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../utils/Api/AuthApi";
import { IAuthLogin } from "../utils/Interfaces";


export const getTokenAndSetToken = createAsyncThunk(
    "token/getAndSetToken",
    async (loginCredentials: IAuthLogin) => {
        const token = await login(loginCredentials);
        return token;
    }
);

