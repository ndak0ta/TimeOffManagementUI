import axios from "./Api";
import { ITimeOff } from "../Interfaces";

export const getTimeOff = async () => {
    const response = await axios.get("/timeoff");
    return response.data;
}

export const getTimeOffAll = async () => {
    const response = await axios.get("/timeoff");
    return response.data;
}

export const getTimeOffById = async (id: number) => {
    const response = await axios.get(`/timeoff/${id}`);
    return response.data;
}

export const getTimeOffByUserId = async (userId: number) => {
    const response = await axios.get(`/timeoff/user/${userId}`);
    return response.data;
}

export const createTimeOff = async (timeOff: ITimeOff) => {
    const response = await axios.post("/timeoff", timeOff);
    return response.data;
}

export const updateTimeOff = async (timeOff: ITimeOff) => {
    const response = await axios.put(`/timeoff`, timeOff);
    return response.data;
}

export const deleteTimeOff = async (id: number) => {
    const response = await axios.delete(`/timeoff/${id}`);
    return response.data;
}

export const approveTimeOff = async (id: number) => {
    const response = await axios.post(`/timeoff/${id}/approve`);
    return response.data;
}