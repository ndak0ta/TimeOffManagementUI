import axios from "@lib/axios";
import { TimeOff } from "../types";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query"

export type ApproveTimeOffDTO = {
    timeOffId: number;
    isApproved: boolean;
}

export const approveTimeOff =  async ({timeOffId , isApproved}: ApproveTimeOffDTO): Promise<TimeOff> => {
    const response = await axios.post(`/timeoff/${timeOffId}/approve?isApproved=${isApproved}`, "");
    return response.data;
}

type UseApproveTimeOffOptions = {
    config?: MutationConfig<typeof approveTimeOff>;
}

export const useApproveTimeOff = ({ config }: UseApproveTimeOffOptions = {}) => {
    return useMutation({
        onMutate: async (approveTimeOff: ApproveTimeOffDTO) => {
            await queryClient.cancelQueries(['timeOffs']);
            const previousTimeOff = queryClient.getQueryData<TimeOff[]>(['timeOffs', approveTimeOff.timeOffId]);
            queryClient.setQueryData(['timeOffs', approveTimeOff.timeOffId], {
                ...previousTimeOff,
                isApproved: approveTimeOff.isApproved,
                
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
            queryClient.invalidateQueries(['timeOffs']);

            // TODO bildirim eklenebilir
        },
        ...config,
        mutationFn: approveTimeOff,
    });
}
