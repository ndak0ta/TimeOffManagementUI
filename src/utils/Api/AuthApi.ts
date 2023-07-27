import axios from "./Api";
import { IAuthLogin, IAuthRegister } from "../Interfaces";

export const login = async (authLogin: IAuthLogin) => {
    try {
        const response = await axios.post("/auth/login", authLogin);
        return response.data;
    } catch (error) {
        console.log(error);
    }
  };


export const register = async (authRegister: IAuthRegister) => {
    const response = await axios.post("/auth/register", authRegister);
    return response.data;
}