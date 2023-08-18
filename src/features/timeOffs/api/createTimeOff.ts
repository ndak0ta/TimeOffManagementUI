import axios from "@lib/axios";
import { TimeOff } from "../types";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";

export type CreateTimeOffDTO = {
    description: string;
    startDate: Date;
    endDate: Date;
}

export const createTimeOff = async (data: CreateTimeOffDTO): Promise<TimeOff> => {
    const response = await axios.post('/timeOff', data);
    return response.data;
}

type UseCreateTimeOffOptions = {
    config?: MutationConfig<typeof createTimeOff>;
}

export const useCreateTimeOff = ({ config }: UseCreateTimeOffOptions = {}) => {
    return useMutation({
        onMutate: async (newTimeOff: CreateTimeOffDTO) => {
            await queryClient.cancelQueries(['timeOffs']);
            const previousTimeOffs = queryClient.getQueryData<TimeOff[]>(['timeOffs']);
            queryClient.setQueryData(['timeOffs'], [...(previousTimeOffs || []), {
                ...newTimeOff,
                id: Math.random(),
                totalDays: (newTimeOff.endDate.getTime() - newTimeOff.startDate.getTime()) / (1000 * 3600 * 24),
                isApproved: false,
                isPending: true,
                isCancelled: false,
                hasCancelRequest: false,
                createdAt: new Date(),
            }]);

            return { previousTimeOffs };
        },
        onError(error, variables, context: any) {
            if (context?.previousTimeOffs) {
                queryClient.setQueryData(['timeOffs'], context.previousTimeOffs);
            }

            // TODO alert eklenebilir
        },
        onSuccess: () => {
            queryClient.refetchQueries(['timeOffs']);
            // TODO bildirim eklenebilir
        },
        ...config,
        mutationFn: createTimeOff,
    });
}