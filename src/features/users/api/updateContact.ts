import axios from "@lib/axios";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { User } from "../types";


export type UpdateUserContactDTO = {
    id: string;
    email: string;
    phoneNumber: string;
};

export const updateUserContact = async ( data : UpdateUserContactDTO): Promise<User> => {
    const response = await axios.patch("/user/update-contact", data);
    return response.data;
}

type UseUpdateUserContactOptions = {
    config?: MutationConfig<typeof updateUserContact>;
};

export const useUpdateUserContact = ({ config }: UseUpdateUserContactOptions = {}) => {

    return useMutation({
        onMutate: async (data: UpdateUserContactDTO) => {
            await queryClient.cancelQueries(["users"]);
            const previousUsers = queryClient.getQueryData<User[]>(["users"]);
            
            queryClient.setQueryData(["users"], previousUsers?.map((user) => {
                if (user.id === data.id) {
                    return { ...user, ...data };
                }
                return user;
            }) || []);

            return { previousUsers };
        },
        onError: (err, variables, context: any) => {
            queryClient.setQueryData(["users"], context.previousUsers);
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
        mutationFn: updateUserContact,
    });    
};