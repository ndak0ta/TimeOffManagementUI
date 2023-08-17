import axios from "@/lib/axios"
import { UserResponse } from "../types";

export type LoginCredentialDTO = {
    username: string;
    password: string;
};

export const loginWithUsernameAndPassword = async (credential: LoginCredentialDTO): Promise<UserResponse> => {
    const response = await axios.post("/auth/login", credential);
    return response.data
}