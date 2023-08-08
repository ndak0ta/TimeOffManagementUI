import { createAsyncThunk } from "@reduxjs/toolkit";
import { approveOrDeclineTimeOffCancel, createTimeOffCancel, deleteTimeOffCancel, getTimeOffCancel } from "../utils/Api/TimeOffCancelApi";

export const getTimeOffCancelsAndSetTimeOffCancels = createAsyncThunk(
    "timeOffCancel/getTimeOffCancels",
    async (token: string) => {
        const timeOffCancels = await getTimeOffCancel(token);
        return timeOffCancels;
    }
);

export const createTimeOffCancelAndSetTimeOffCancels = createAsyncThunk(
    "timeOffCancel/createTimeOffCancel",
    async ({ token, timeOffId }: { token: string, timeOffId: number }) => {
        await createTimeOffCancel(token, timeOffId);
        const timeOffCancels = await getTimeOffCancel(token);
        return timeOffCancels;
    }
);

export const deleteTimeOffCancelAndSetTimeOffCancels = createAsyncThunk(
    "timeOffCancel/deleteTimeOffCancel",
    async ({ token, timeOffCancelId }: { token: string, timeOffCancelId: number }) => {
        await deleteTimeOffCancel(token, timeOffCancelId);
        const timeOffCancels = await getTimeOffCancel(token);
        return timeOffCancels;
    }
);

export const approveOrDeclineTimeOffCancelAndSetTimeOffCancels = createAsyncThunk(
    "timeOffCancel/approveOrDeclineTimeOffCancel",
    async ({ token, timeOffCancelId, isApproved }: { token: string, timeOffCancelId: number, isApproved: boolean }) => {
        await approveOrDeclineTimeOffCancel(token, timeOffCancelId, isApproved);
        const timeOffCancels = await getTimeOffCancel(token);
        return timeOffCancels;
    }
);