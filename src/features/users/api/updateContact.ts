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
    return axios.patch("/user/update-contact", data);
}

type UseUpdateUserContactOptions = {
    config?: MutationConfig<typeof updateUserContact>;
};

export const useUpdateUserContact = ({ config }: UseUpdateUserContactOptions = {}) => {

    return useMutation({
        onMutate: async (data: UpdateUserContactDTO) => {
            await queryClient.cancelQueries(["users"]);
            const previousUser = queryClient.getQueryData<User>(["users", data.id]);
            queryClient.setQueryData(["users", data.id], {
                ...(previousUser || []),
                ...data,
            });

            return { previousUser };
        },
        onError: (err, variables, context: any) => {
            queryClient.setQueryData(["users", context.previousUser], context.previousUser);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["users", data.id]);
        },
        ...config,
        mutationFn: updateUserContact,
    });    
};