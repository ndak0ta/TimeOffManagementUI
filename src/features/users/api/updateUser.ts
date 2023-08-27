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

export const updateUser = async (data: UpdateUserDTO): Promise<User> => {
    const response = await axios.put("/user", data);
    return response.data;
}

type UseUpdateUserOptions = {
    config?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = ({ config }: UseUpdateUserOptions = {}) => {
    return useMutation({
        onMutate: async (data: UpdateUserDTO) => {
            await queryClient.cancelQueries(["users", data.id]);
            const previousUsers = queryClient.getQueryData<User[]>(["users"]);
            
            queryClient.setQueryData(["users"], previousUsers?.map((user) => {
                if (user.id === data.id) {
                    return { ...user, ...data };
                }
                return user;
            }) || []);

            return { previousUsers };
        },
        onError: (err, data, context: any) => {
            if (context?.previousUser) {
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
        mutationFn: updateUser,
    });    
}
