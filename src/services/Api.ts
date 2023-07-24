import axios from "axios";

export interface IAuthLogin {
    username: string;
    password: string;
}

export interface IAuthRegister {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    hireDate: Date;
    phoneNumber: string;
} // TODO adress bilgilerini de al

export interface ITimeOff {
    description: string;
    startDate: Date;
    endDate: Date;
    totalDays: number;
}

export interface IUserCreate {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    hireDate: Date;
    phoneNumber: string;
}

export interface IUserUpdate {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
}

export interface IUserChangePassword {
    oldPassword: string;
    newPassword: string;
}

axios.defaults.baseURL = "https://localhost:7064";

// Auth
export const login = async (authLogin: IAuthLogin) => {
    const response = await axios.post("/auth/login", authLogin);
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data}`;
    return response.data;
}

export const logout = () => {
    axios.defaults.headers.common["Authorization"] = "";
}

export const register = async (authRegister: IAuthRegister) => {
    const response = await axios.post("/auth/register", authRegister);
    return response.data;
}


// TimeOff
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

// User
export const getUser = async () => {
    const response = await axios.get("/user");
    return response.data;
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

export const changePassword = async (password: string) => {
    const response = await axios.post(`/user/change-password`, password);
    return response.data;
}

export const setAnnulTimeOff = async (id: number, AnnualTimeoff: Number) => {
    const response = await axios.post(`/timeoff/${id}/set-annual`, AnnualTimeoff);
    return response.data;
}
