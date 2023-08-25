import axios from "@lib/axios";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { User } from "../types";

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
    return useMutation({
        onMutate: async (data: UpdateUserDTO) => {
            await queryClient.cancelQueries(['users']);
            const previousUser = queryClient.getQueryData<User>(['users', data.id]);

            queryClient.setQueryData(['users', data.id], {
                ...(previousUser || []),
                ...data,
            });

            return { previousUser };
        },
        onError: (err, data, context: any) => {
            if (context?.previousUser) {
                queryClient.setQueryData(['users', data.id], context.previousUser);
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['users', data.id]);
        },
        ...config,
        mutationFn: updateUser,
    });    
}
