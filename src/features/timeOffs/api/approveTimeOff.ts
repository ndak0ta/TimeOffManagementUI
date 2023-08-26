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
            const previousTimeOffs = queryClient.getQueryData<TimeOff[]>(['timeOffs']);
            queryClient.setQueryData(['timeOffs'], previousTimeOffs?.map((timeOff) => {
                if (timeOff.id === approveTimeOff.timeOffId) {
                    return { ...timeOff, isApproved: approveTimeOff.isApproved };
                }
                return timeOff;
            }) || []);

            return { previousTimeOffs };
        },
        onError(error, variables, context: any) {
            if (context?.previousTimeOffs) {
                queryClient.setQueryData(['timeOffs'], context.previousTimeOffs);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['timeOffs']);

            // TODO bildirim eklenebilir
        },
        ...config,
        mutationFn: approveTimeOff,
    });
}
