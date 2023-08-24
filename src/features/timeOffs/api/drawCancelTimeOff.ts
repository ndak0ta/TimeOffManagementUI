import axios from "@lib/axios";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { TimeOff } from "../types";

type DrawCancelTimeOffDTO = {
    id: number;
}

export const drawCancelTimeOff = async ({ id }: DrawCancelTimeOffDTO) => {
    const response = await axios.post(`/timeoff/${id}/cancel-draw`);
    return response.data;
}

type UseDrawCancelTimeOff = {
    config?: MutationConfig<typeof drawCancelTimeOff>;
}

export const useDrawCancelTimeOff = ({ config }: UseDrawCancelTimeOff = {}) => {
    return useMutation({
        onMutate: async (drawCancelTimeOff: DrawCancelTimeOffDTO) => {
            await queryClient.cancelQueries(["timeOffs"]);
            const previousTimeOff = queryClient.getQueryData<TimeOff>(["timeOffs", drawCancelTimeOff.id]);

            queryClient.setQueryData(["timeOffs", drawCancelTimeOff.id],  {
                ...previousTimeOff,
                hasCancelRequest: false
            });
            return { previousTimeOff };
        },
        onError: (err, drawCancelTimeOff, context: any) => {
            queryClient.setQueryData(["timeOffs", drawCancelTimeOff.id], context.previousTimeOff);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["timeOffs"]); // TODO - Refetch only the timeOff that was updated
        },
        ...config,
        mutationFn: drawCancelTimeOff,
    });
}