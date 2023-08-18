import axios from "@lib/axios";
import { UserResponse } from "@features/auth/types";


export type RegisterCredentialDTO = {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    hireDate: Date;
    phoneNumber: string;
    address: string;
};

export const registerWithUsernameAndPassword = async (credential: RegisterCredentialDTO): Promise<UserResponse> => {
    const response = await axios.post('/auth/register', credential);
    return response.data;
};
