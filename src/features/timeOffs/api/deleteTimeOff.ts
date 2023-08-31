import axios from "@lib/axios";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { TimeOff } from "../types";

type DeleteTimeOffDTO = {
    timeOffId: number;
}

export const deleteTimeOff = async ({ timeOffId }: DeleteTimeOffDTO): Promise<boolean> => {
    return axios.delete(`/timeOff/${timeOffId}`);
}

type UseDeleteTimeOffOptions = {
    config?: MutationConfig<typeof deleteTimeOff>;
}

export const useDeleteTimeOff = ({ config }: UseDeleteTimeOffOptions = {}) => {
    return useMutation({
        onMutate: async ({ timeOffId }: DeleteTimeOffDTO) => {
            await queryClient.cancelQueries(['timeOffs']);

            const previousTimeOffs = queryClient.getQueryData<TimeOff[]>(['timeOffs']);
            
            queryClient.setQueryData<TimeOff[]>(['timeOffs'], (previousTimeOffs || [])
            .filter(timeOff => timeOff.id !== timeOffId));

            return { previousTimeOffs };
        },
        onError: (error: any, variables: any, context: any) => {
            if (context?.previousTimeOffs) {
                queryClient.setQueryData(['timeOffs'], context.previousTimeOffs);
            }
        },
        ...config,
        // @ts-ignore
        mutationFn: deleteTimeOff,
    });
};