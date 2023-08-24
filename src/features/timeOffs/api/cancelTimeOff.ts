import axios from "@lib/axios";
import { TimeOff } from "../types";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query"

export type CancelTimeOffDTO = {
    id: number;
}

export const cancelTimeOff = async ({ id }: CancelTimeOffDTO): Promise<TimeOff> => {
    const response = await axios.post(`/timeOff/${id}/cancel-request`);
    return response.data;
}

type UseCancelTimeOffOptions = {
    config?: MutationConfig<typeof cancelTimeOff>;
}

export const useCancelTimeOff = ({ config }: UseCancelTimeOffOptions = {}) => {
    return useMutation({
        onMutate: async (cancelTimeOff: CancelTimeOffDTO) => {
            await queryClient.cancelQueries(['timeOffs']);
            const previousTimeOff = queryClient.getQueryData<TimeOff>(['timeOffs', cancelTimeOff.id]);
            queryClient.setQueryData(['timeOffs', cancelTimeOff.id], {
                ...previousTimeOff,
                hasCancelRequest: true,
            });

            return { previousTimeOff };
        },
        onError(error, variables, context: any) {
            if (context?.previousTimeOffs) {
                queryClient.setQueryData(['timeOffs', context.previousTimeOff.id], context.previousTimeOff);
            }

            // TODO alert eklenebilir
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["timeOffs"]); // TODO - Refetch only the timeOff that was updated

            // TODO bildirim eklenebilir
        },
        ...config,
        mutationFn: cancelTimeOff,
    });
}

