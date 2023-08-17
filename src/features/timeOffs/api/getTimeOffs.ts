import axios from "@/lib/axios"
import { ExtractFnReturnType } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { TimeOff } from "../types";

export const getTimeOff = async (): Promise<TimeOff[]> => {
    const response = await axios.get(`/timeOff/all`);
    return response.data;
}

type QueryFnType = typeof getTimeOff;

type UseTimeOffsOptions = {
    config?: any;
}

export const useTimeOffs = ({ config }: UseTimeOffsOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['timeOffs'],
        queryFn: () => getTimeOff()
    });
}