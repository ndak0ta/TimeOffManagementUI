import axios from "@lib/axios";
import { TimeOff, TimeOffStates } from "../types";
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
                    return { ...timeOff, status: approveTimeOff.isApproved ? TimeOffStates.APPROVED : TimeOffStates.REJECTED };
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
        onSuccess: (data) => {
            queryClient.setQueryData<TimeOff[] | undefined>(['timeOffs'], (oldData) => {
                if (!oldData) return oldData;
              
                const updatedData = oldData.map((timeOff) => {
                  if (timeOff.id === data.id) {
                    return data;
                  }
                  return timeOff;
                });
              
                return updatedData;
              });
        },
        ...config,
        mutationFn: approveTimeOff,
    });
}
