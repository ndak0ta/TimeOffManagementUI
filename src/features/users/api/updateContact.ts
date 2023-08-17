import { useUser } from "@/lib/auth";
import axios from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";


export type UpdateUserContactDTO = {
    data: {
        email: string;
        phoneNumber: string;
    };
};

export const updateUserContact = async ({ data }: UpdateUserContactDTO) => {
    return axios.put("/user", data);
}

type UseUpdateUserContactOptions = {
    config?: MutationConfig<typeof updateUserContact>;
};

export const useUpdateUserContact = ({ config }: UseUpdateUserContactOptions = {}) => {
    const user = useUser();

    return useMutation({
        onSuccess: () => {
            user.refetch();
        },
        ...config,
        mutationFn: updateUserContact,
    });    
};