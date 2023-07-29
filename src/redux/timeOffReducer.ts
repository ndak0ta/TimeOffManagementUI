import { createSlice } from "@reduxjs/toolkit";
import { ITimeOff } from "../utils/Interfaces";
import { createTimeOffAndSetTimeOffs, getTimeOffsAndSetTimeOffs } from "./timeOffThunks";
import { createTimeOff } from "../utils/Api/TimeOffApi";

interface TimeOffState {
    timeOff: ITimeOff | null;
    loading?: boolean;
    error?: string | null;
}

const initialState: TimeOffState = {
    timeOff: null,
    loading: false,
    error: null
};

const timeOffSlice = createSlice({
    name: "timeOff",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTimeOffsAndSetTimeOffs.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getTimeOffsAndSetTimeOffs.fulfilled, (state, action) => {
            state.timeOff = action.payload;
            state.loading = false;
        }).addCase(getTimeOffsAndSetTimeOffs.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        }).addCase(createTimeOffAndSetTimeOffs.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(createTimeOffAndSetTimeOffs.fulfilled, (state, action) => {
            state.timeOff = action.payload;
            state.loading = false;
        }).addCase(createTimeOffAndSetTimeOffs.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    }
});

export default timeOffSlice.reducer;
