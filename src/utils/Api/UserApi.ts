import axios from "./Api";
import { IUser, IUserCreate, IUserUpdate } from "../Interfaces";

export const getUser = async () => {
    try {
        const response = await axios.get("/user");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getUserAll = async () => {
    const response = await axios.get("/user/all");
    return response.data;
}

export const getUserById = async (id: number) => {
    const response = await axios.get(`/user/${id}`);
    return response.data;
}

export const getUserByUsername = async (username: string) => {
    const response = await axios.get(`/user/username/${username}`);
    return response.data;
}

export const getUserByEmail = async (email: string) => {
    const response = await axios.get(`/user/email/${email}`);
    return response.data;
}

export const getUserRole = async () => {
    const response = await axios.get("/user/role");
    return response.data.name;
}

export const createUser = async (user: IUserCreate) => {
    const response = await axios.post("/user", user);
    return response.data;
}

export const updateUser = async (user: IUserUpdate) => {
    const response = await axios.put(`/user`, user);
    return response.data;
}

export const deleteUser = async (id: number) => {
    const response = await axios.delete(`/user/${id}`);
    return response.data;
}

export const hardUpdateUser = async (user: IUser) => {
    const response = await axios.put(`/user/hard-update`, user);
    return response.data;
}

export const changePassword = async (password: string) => {
    const response = await axios.post(`/user/change-password`, password);
    return response.data;
}

export const setAnnulTimeOff = async (id: number, AnnualTimeoff: Number) => {
    const response = await axios.post(`/timeoff/${id}/set-annual`, AnnualTimeoff);
    return response.data;
}