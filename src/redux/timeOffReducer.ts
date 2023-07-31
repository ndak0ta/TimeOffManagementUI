import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITimeOff } from "../utils/Interfaces";
import { createTimeOffAndSetTimeOffs, deleteTimeOffAndSetTimeOffs, getTimeOffsAndSetTimeOffs, updateTimeOffAndSetTimeOffs } from "./timeOffThunks";
import { createTimeOff } from "../utils/Api/TimeOffApi";

interface TimeOffState {
    timeOff: ITimeOff | null;
    loading?: boolean;
    error?: string | null;
}

const initialState: TimeOffState = {
    timeOff: null,
    loading: true,
    error: null
};

const setLoadingAndClearError = (state: TimeOffState) => {
    state.loading = true;
    state.error = null;
};
  
const setTimeOffAndClearLoading = (state: TimeOffState, action: any) => {
    state.timeOff = action.payload;
    state.loading = false;
};
  
const setErrorAndClearLoading = (state: TimeOffState, action: any) => {
    state.error = action.error.message;
    state.loading = false;
};

const timeOffSlice = createSlice({
    name: "timeOff",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getTimeOffsAndSetTimeOffs.pending, setLoadingAndClearError)
        .addCase(getTimeOffsAndSetTimeOffs.fulfilled, setTimeOffAndClearLoading)
        .addCase(getTimeOffsAndSetTimeOffs.rejected, setErrorAndClearLoading)

        .addCase(createTimeOffAndSetTimeOffs.pending, setLoadingAndClearError)
        .addCase(createTimeOffAndSetTimeOffs.fulfilled, setTimeOffAndClearLoading)
        .addCase(createTimeOffAndSetTimeOffs.rejected, setErrorAndClearLoading)

        .addCase(updateTimeOffAndSetTimeOffs.pending, setLoadingAndClearError)
        .addCase(updateTimeOffAndSetTimeOffs.fulfilled, setTimeOffAndClearLoading)
        .addCase(updateTimeOffAndSetTimeOffs.rejected, setErrorAndClearLoading)

        .addCase(deleteTimeOffAndSetTimeOffs.pending, setLoadingAndClearError)
        .addCase(deleteTimeOffAndSetTimeOffs.fulfilled, setTimeOffAndClearLoading)
        .addCase(deleteTimeOffAndSetTimeOffs.rejected, setErrorAndClearLoading);
    }
});

export default timeOffSlice.reducer;

