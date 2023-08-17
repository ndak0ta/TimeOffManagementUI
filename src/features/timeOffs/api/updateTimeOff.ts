import axios from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { TimeOff } from "../types";

export type UpdateTimeOffDTO = {
    id: number;
    description: string;
    startDate: Date;
    endDate: Date;
}

export const updateTimeOff = async (data: UpdateTimeOffDTO): Promise<TimeOff> => {
    const response = await axios.put(`/timeOff`, data);
    return response.data;
}

type UseUpdateTimeOffOptions = {
    config?: MutationConfig<typeof updateTimeOff>;
}

export const useUpdateTimeOff = ({ config }: UseUpdateTimeOffOptions = {}) => {
    return useMutation({
        onMutate: async (updatedTimeOff: UpdateTimeOffDTO) => {
            await queryClient.cancelQueries(['timeOffs']);

            const previousTimeOff = queryClient.getQueryData<TimeOff>(['timeOffs', updatedTimeOff.id]);

            queryClient.setQueryData(['timeOffs', updatedTimeOff.id], {
                ...previousTimeOff,
                ...updatedTimeOff,
            });

            return { previousTimeOff };
        },
        onError: (error, variables, context: any) => {
            if (context?.previousTimeOff) {
                queryClient.setQueryData(['timeOffs', context.previousTimeOff.id], context.previousTimeOff);
            }

            // TODO alert eklenebilir
        },
        onSuccess: (data) => {
            queryClient.refetchQueries(['timeOffs', data.id]);

            // TODO bildirim eklenebilir
        },
        ...config,
        mutationFn: updateTimeOff,
    });
}