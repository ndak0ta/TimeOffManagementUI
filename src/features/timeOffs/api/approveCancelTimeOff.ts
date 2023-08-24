import axios from "@lib/axios";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { TimeOff } from "../types";

export type ApproveCancelTimeOffDTO = {
    timeOffId: number;
    isApproved: boolean;
}

export const approveCancelTimeOff = async ({timeOffId , isApproved}: ApproveCancelTimeOffDTO): Promise<TimeOff> => {
    const response = await axios.post(`/timeOff/${timeOffId}/approve-cancel`, isApproved);
    return response.data;
}  

type UseApproveCancelTimeOffOptions = {
    config?: MutationConfig<typeof approveCancelTimeOff>;
}

export const useApproveCancelTimeOff = ({ config }: UseApproveCancelTimeOffOptions = {}) => {
    return useMutation({
        onMutate: async (approveCancelTimeOff: ApproveCancelTimeOffDTO) => {
            await queryClient.cancelQueries(['timeOffs']);

            const previousTimeOff = queryClient.getQueryData<TimeOff[]>(['timeOffs', approveCancelTimeOff.timeOffId]);
            
            queryClient.setQueryData(['timeOffs', approveCancelTimeOff.timeOffId], {
                ...previousTimeOff,
                isApproved: approveCancelTimeOff.isApproved,
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
            queryClient.invalidateQueries(['timeOffs']); // TODO timeOffs yerine sadece tek bir timeOff refetch edilebilir

            // TODO bildirim eklenebilir
        },
        ...config,
        mutationFn: approveCancelTimeOff,
    });
}