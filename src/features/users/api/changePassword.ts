import axios from "@lib/axios";
import { MutationConfig } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";

export type ChangePasswordDTO = {
    id: string;
    oldPassword: string;
    newPassword: string;
};

export const changePassword = async (data: ChangePasswordDTO) => {
    const response = await axios.post("/user/change-password", data);
    return response.data;
}

type UseChangePasswordOptions = {
    config?: MutationConfig<typeof changePassword>;
};

export const useChangePassword = ({ config }: UseChangePasswordOptions = {}) => {
    return useMutation({
        ...config,
        mutationFn: changePassword,
    });    
}