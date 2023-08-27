import axios from "@lib/axios";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { TimeOff, TimeOffStates } from "../types";

export type ApproveCancelTimeOffDTO = {
    timeOffId: number;
    isApproved: boolean;
}

export const approveCancelTimeOff = async ({timeOffId , isApproved}: ApproveCancelTimeOffDTO): Promise<TimeOff> => {
    const response = await axios.post(`/timeOff/${timeOffId}/approve-cancel/${isApproved}`);
    return response.data;
}  

type UseApproveCancelTimeOffOptions = {
    config?: MutationConfig<typeof approveCancelTimeOff>;
}

export const useApproveCancelTimeOff = ({ config }: UseApproveCancelTimeOffOptions = {}) => {
    return useMutation({
        onMutate: async (approveCancelTimeOff: ApproveCancelTimeOffDTO) => {
            await queryClient.cancelQueries(['timeOffs']);
            const previousTimeOffs = queryClient.getQueryData<TimeOff[]>(['timeOffs']);
            
            queryClient.setQueryData(['timeOffs'], previousTimeOffs?.map((timeOff) => {
                if (timeOff.id === approveCancelTimeOff.timeOffId) {
                    return { ...timeOff, status: approveCancelTimeOff.isApproved ? TimeOffStates.CANCELLED : TimeOffStates.CANCEL_REJECTED };
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
        onSuccess: (data, variables, context) => {
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
        mutationFn: approveCancelTimeOff,
    });
}