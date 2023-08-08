import { createSlice } from "@reduxjs/toolkit";
import { ITimeOffCancel } from "../utils/Interfaces";
import { approveOrDeclineTimeOffCancelAndSetTimeOffCancels, createTimeOffCancelAndSetTimeOffCancels, deleteTimeOffCancelAndSetTimeOffCancels, getTimeOffCancelsAndSetTimeOffCancels } from "./timeOffCancelThunks";

interface TimeOffCancelState {
    timeOffCancel: ITimeOffCancel | null;
    loading?: boolean;
    error?: string | null;
}

const initialState: TimeOffCancelState = {
    timeOffCancel: null,
};

const setLoadingAndClearError = (state: TimeOffCancelState) => {
    state.loading = true;
    state.error = null;
};
  
const setTimeOffCancelAndClearLoading = (state: TimeOffCancelState, action: any) => {
    state.timeOffCancel = action.payload;
    state.loading = false;
};
  
const setErrorAndClearLoading = (state: TimeOffCancelState, action: any) => {
    state.error = action.error.message;
    state.loading = false;
};

const timeOffCancelSlice = createSlice({
    name: "timeOffCancel",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getTimeOffCancelsAndSetTimeOffCancels.pending, setLoadingAndClearError)
        .addCase(getTimeOffCancelsAndSetTimeOffCancels.fulfilled, setTimeOffCancelAndClearLoading)
        .addCase(getTimeOffCancelsAndSetTimeOffCancels.rejected, setErrorAndClearLoading)

        .addCase(createTimeOffCancelAndSetTimeOffCancels.pending, setLoadingAndClearError)
        .addCase(createTimeOffCancelAndSetTimeOffCancels.fulfilled, setTimeOffCancelAndClearLoading)
        .addCase(createTimeOffCancelAndSetTimeOffCancels.rejected, setErrorAndClearLoading)

        .addCase(deleteTimeOffCancelAndSetTimeOffCancels.pending, setLoadingAndClearError)
        .addCase(deleteTimeOffCancelAndSetTimeOffCancels.fulfilled, setTimeOffCancelAndClearLoading)
        .addCase(deleteTimeOffCancelAndSetTimeOffCancels.rejected, setErrorAndClearLoading)

        .addCase(approveOrDeclineTimeOffCancelAndSetTimeOffCancels.pending, setLoadingAndClearError)
        .addCase(approveOrDeclineTimeOffCancelAndSetTimeOffCancels.fulfilled, setTimeOffCancelAndClearLoading)
        .addCase(approveOrDeclineTimeOffCancelAndSetTimeOffCancels.rejected, setErrorAndClearLoading);
    }
});