import axios from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { TimeOff } from "../types";

type DeleteTimeOffDTO = {
    id: number;
}

export const deleteTimeOff = async ({id}: DeleteTimeOffDTO) => {
    const response = await axios.delete(`/timeOff/${id}`);
    return response.data;
}

type UseDeleteTimeOffOptions = {
    config?: MutationConfig<typeof deleteTimeOff>;
}

export const useDeleteTimeOff = ({config}: UseDeleteTimeOffOptions = {}) => {
    return useMutation({
        onMutate: async (timeOffId: number) => {
            await queryClient.cancelQueries(['timeOffs']);
            const previousTimeOffs = queryClient.getQueryData<TimeOff[]>(['timeOffs']);
            queryClient.setQueryData(['timeOffs'], (previousTimeOffs || []).filter(timeOff => timeOff.id !== timeOffId));

            return {previousTimeOffs};
        },
        onError: (error: any, variables: any, context: any) => {
            if (context?.previousTimeOffs) {
                queryClient.setQueryData(['timeOffs'], context.previousTimeOffs);
            }

            // TODO alert eklenebilir
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['timeOffs']);

            // TODO bildirim eklenebilir
        },
        ...config,
        // @ts-ignore
        mutationFn: deleteTimeOff,
    });
};