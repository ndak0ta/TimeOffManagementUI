import axios from "@lib/axios";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { User } from "../types";

type AddUserToRoleDTO = {
    userId: string;
    role: string;
};

export const addUserToRole = async ({ userId, role }: AddUserToRoleDTO): Promise<User> => {
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
            const previousUsers = queryClient.getQueryData<User[]>(["users"]);
            
            queryClient.setQueryData(["users"], previousUsers?.map((user) => {
                if (user.id === userId) {
                    return { ...user, roles: [ role ] };
                }
                return user;
            }) || []);

            return { previousUsers };
        },
        onError: (error, variables, context: any) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(["users"], context.previousUsers);
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData<User[] | undefined>(['users'], (oldData) => {
                if (!oldData) return oldData;
              
                const updatedData = oldData.map((user) => {
                  if (user.id === data.id) {
                    return data;
                  }
                  return user;
                });
              
                return updatedData;
              });
        },
        ...config,
        mutationFn: addUserToRole,
    });
}