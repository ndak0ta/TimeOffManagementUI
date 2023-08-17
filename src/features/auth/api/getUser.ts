import axios from "@/lib/axios"
import { AuthUser } from "../types";

export const getUser = async (): Promise<AuthUser> => {
    const response = await axios.get('/user');
    return response.data;
}