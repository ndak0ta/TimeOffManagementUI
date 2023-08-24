import axios from "@lib/axios";
import { User } from "../types";
import { MutationConfig } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { useUsers } from "./getUsers";

type CreateUserDTO = {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    hireDate: Date;
    phoneNumber: string;
    email: string;
    address: string;
};

export const createUser = async (dto: CreateUserDTO): Promise<User> => {
    const response = await axios.post('/user', dto);
    return response.data;
}

type UseCreateUserOptions = {
    config?: MutationConfig<typeof createUser>;
};

export const useCreateUser = (options: UseCreateUserOptions = {}) => {
    const users = useUsers();

    return useMutation({
        onSuccess: (data, variables, context: any) => {
            users.refetch();
        },
        onError: (err, variables, context: any) => {
            users.refetch();
        },
        ...options,
        mutationFn: createUser,
    });
}