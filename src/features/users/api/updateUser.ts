import axios from "@lib/axios";
import { MutationConfig } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { useUsers } from "./getUsers";

export type UpdateUserDTO = {
        id: string;
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        address: string;
        dateOfBirth: Date;
        hireDate: Date;
};

export const updateUser = async (data: UpdateUserDTO) => {
    const response = await axios.put("/user", data);
    return response.data;
}

type UseUpdateUserOptions = {
    config?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = ({ config }: UseUpdateUserOptions = {}) => {
    const users = useUsers();

    return useMutation({
        onSuccess: () => {
            users.refetch();
        },
        onError: (err, variables, context: any) => {
            users.refetch();
        },
        ...config,
        mutationFn: updateUser,
    });    
}
