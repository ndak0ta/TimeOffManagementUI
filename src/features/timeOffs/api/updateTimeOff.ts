import axios from "@lib/axios";
import { MutationConfig, queryClient } from "@lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { TimeOff } from "../types";

export type UpdateTimeOffDTO = {
    id: number;
    description: string;
    startDate: Date;
    endDate: Date;
}

export const updateTimeOff = async (data: UpdateTimeOffDTO): Promise<TimeOff> => {
    const response = await axios.put(`/timeOff`, data);
    return response.data;
}

type UseUpdateTimeOffOptions = {
    config?: MutationConfig<typeof updateTimeOff>;
}

export const useUpdateTimeOff = ({ config }: UseUpdateTimeOffOptions = {}) => {
    return useMutation({
        onMutate: async (updatedTimeOff: UpdateTimeOffDTO) => {
            await queryClient.cancelQueries(['timeOffs']);

            const previousTimeOffs = queryClient.getQueryData<TimeOff[]>(['timeOffs']);

            queryClient.setQueryData(['timeOffs'], previousTimeOffs?.map((timeOff) => {
                if (timeOff.id === updatedTimeOff.id) {
                    return { ...timeOff, ...updatedTimeOff };
                }
                return timeOff;
            }) || []);

            return { previousTimeOffs };
        },
        onError: (error, variables, context: any) => {
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
        mutationFn: updateTimeOff,
    });
}