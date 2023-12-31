import axios from "@lib/axios";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { TimeOff } from "../types";

type DrawCancelTimeOffDTO = {
    id: number;
}

export const drawCancelTimeOff = async ({ id }: DrawCancelTimeOffDTO): Promise<TimeOff> => {
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
            const previousTimeOffs = queryClient.getQueryData<TimeOff[]>(["timeOffs"]);

            queryClient.setQueryData(["timeOffs", drawCancelTimeOff.id], (previousTimeOffs || []).map((timeOff) => {
                if (timeOff.id === drawCancelTimeOff.id) {
                    return { ...timeOff, isApproved: false };
                }
                return timeOff;
            }) || [])
            ;
            return { previousTimeOffs };
        },
        onError: (err, drawCancelTimeOff, context: any) => {
            if (context?.previousTimeOff) {
                queryClient.setQueryData(["timeOffs"], context.previousTimeOff);
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
        mutationFn: drawCancelTimeOff,
    });
}