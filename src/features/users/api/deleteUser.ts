import axios from "@lib/axios";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { User } from "../types";

export type DeleteUserDTO = {
    id: string;
};

export const deleteUser = async ({ id }: DeleteUserDTO): Promise<boolean> => {
    const response = await axios.delete(`/user/${id}`);
    console.log(response);
    return response.data;
}

type UseDeleteUserOptions = {
    config?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({ config }: UseDeleteUserOptions = {}) => {
    return useMutation({
        onMutate: async (deletedUser: DeleteUserDTO) => {
            await queryClient.cancelQueries(["users"]);

            const previeusUsers = queryClient.getQueryData<User[]>(["users"]);

            queryClient.setQueryData<User[]>(["users"], previeusUsers?.filter((user) => user.id !== deletedUser.id) || []);

            return { previeusUsers };
        },
        onError: (err, variables, context: any) => {
            if (context?.previeusUsers) {
                queryClient.setQueryData<User[]>(["users"], context?.previeusUsers);
            }
        },
        ...config,
        mutationFn: deleteUser,
    });
};