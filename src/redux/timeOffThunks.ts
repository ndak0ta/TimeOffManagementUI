import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTimeOff, getTimeOff } from "../utils/Api/TimeOffApi";
import { ITimeOffRequest } from "../utils/Interfaces";
import { AppDispatch } from "./store";

export const getTimeOffsAndSetTimeOffs = createAsyncThunk(
    "timeOff/getTimeOffs",
    async (token: string) => {
        const timeOffs = await getTimeOff(token);
        return timeOffs;
    }
);

export const createTimeOffAndSetTimeOffs = createAsyncThunk(
    "timeOff/createTimeOff",
    async ({ token, timeOff }: { token: string, timeOff: ITimeOffRequest }) => {
        await createTimeOff(token, timeOff);
        const timeOffs = await getTimeOff(token);
        return timeOffs;
    }
);
