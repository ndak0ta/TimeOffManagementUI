import axios from "@lib/axios";
import { ExtractFnReturnType } from "@lib/react-query";
import { useQuery } from "@tanstack/react-query";

export const getTimeOff = async (id: number) => {
    const response = await axios.get(`/timeOff/${id}`);
    return response.data;
}

type QueryFnType = typeof getTimeOff;

type UseTimeOffOptions = {
    timeOffId: number;
    config?: any;
}

export const useTimeOff = ({timeOffId, config}: UseTimeOffOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['timeOffs', timeOffId],
        queryFn: () => getTimeOff(timeOffId)
    });
};