import axios from "@lib/axios";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { User } from "../types";

type AddUserToRoleDTO = {
    userId: string;
    role: string;
};

export const addUserToRole = async ({ userId, role }: AddUserToRoleDTO) => {
    const response = await axios.patch(`/user/${userId}/give-role/${role}`);
    return response.data;
}

type addUserToRoleOptions = {
    config?: MutationConfig<typeof addUserToRole>;
};

export const useAddUserToRole = ({ config }: addUserToRoleOptions = {}) => {
    return useMutation({
        onMutate: async ({ userId, role }) => {
            await queryClient.cancelQueries(["users", userId]);
            const previousUser = queryClient.getQueryData<User>(["users", userId]);
            
            queryClient.setQueryData(["users", userId], {
                ...previousUser,
                roles: [role],
            });

            return { previousUser };
        },
        onError: (error, variables, context: any) => {
            if (context?.previousUser) {
                queryClient.setQueryData(["users", variables.userId], context.previousUser);
            }
        },
        onSuccess: ({ userId }) => {
            queryClient.invalidateQueries(["users", userId]);
        },
        ...config,
        mutationFn: addUserToRole,
    });
}