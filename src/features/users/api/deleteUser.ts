import axios from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { User } from "../types";

export type DeleteUserDTO = {
    id: string;
};

export const deleteUser = async ({ id }: DeleteUserDTO) => {
    return axios.delete(`/user/${id}`);
}

type UseDeleteUserOptions = {
    config?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({ config }: UseDeleteUserOptions = {}) => {
    // TODO bildirim sistemi ekliyebilirsin

    return useMutation({
        onMutate: async (deletedUser: DeleteUserDTO) => {
            await queryClient.cancelQueries(["users"]);

            const previeusUsers = queryClient.getQueryData<User[]>(["users"]);

            queryClient.setQueryData<User[]>(["users"], previeusUsers?.filter((user) => user.id !== deletedUser.id) || []);
        },
        onError: (err, variables, context: any) => {
            if (context?.previeusUsers)
                queryClient.setQueryData<User[]>(["users"], context?.previeusUsers);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        },
        ...config,
        mutationFn: deleteUser,
    });
};