import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTimeOff, deleteTimeOff, getTimeOff, updateTimeOff } from "../utils/Api/TimeOffApi";
import { ITimeOffRequest } from "../utils/Interfaces";

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

export const updateTimeOffAndSetTimeOffs = createAsyncThunk(
    "timeOff/updateTimeOff",
    async ({ token, timeOff }: { token: string, timeOff: ITimeOffRequest }) => {
        await updateTimeOff(token, timeOff);
        const timeOffs = await getTimeOff(token);
        return timeOffs;
    }
);

export const deleteTimeOffAndSetTimeOffs = createAsyncThunk(
    "timeOff/deleteTimeOff",
    async ({ token, timeOffId }: { token: string, timeOffId: number }) => {
        await deleteTimeOff(token, timeOffId);
        const timeOffs = await getTimeOff(token);
        return timeOffs;
    }
);
