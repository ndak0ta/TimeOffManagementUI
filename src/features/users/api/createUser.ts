import axios from "@lib/axios";
import { User } from "../types";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";

type CreateUserDTO = {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    hireDate: Date;
    phoneNumber: string;
    email: string;
    address: string;
};

export const createUser = async (user: CreateUserDTO): Promise<User> => {
    const response = await axios.post('/user', user);
    return response.data;
}

type UseCreateUserOptions = {
    config?: MutationConfig<typeof createUser>;
};

export const useCreateUser = (options: UseCreateUserOptions = {}) => {
    return useMutation({
        onMutate: async (user: CreateUserDTO) => {
            await queryClient.cancelQueries(['users']);
            const previousUsers = queryClient.getQueryData<User[]>(['users']);

            queryClient.setQueryData(['users'], [...(previousUsers || []), user]);

            return { previousUsers };
        },
        onError: (err, variables, context: any) => {
            queryClient.setQueryData(['users'], context.previousUsers);
        },
        onSuccess: (data, variables, context: any) => {
            queryClient.invalidateQueries(['users']);
        },
        ...options,
        mutationFn: createUser,
    });
}