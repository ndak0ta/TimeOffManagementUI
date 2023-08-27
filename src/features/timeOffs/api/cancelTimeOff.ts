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
            const previousTimeOffs = queryClient.getQueryData<TimeOff[]>(['timeOffs']);

            queryClient.setQueryData(['timeOffs'], previousTimeOffs?.map((timeOff) => {
                if (timeOff.id === cancelTimeOff.id) {
                    return { ...timeOff, isApproved: false };
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
        mutationFn: cancelTimeOff,
    });
}

