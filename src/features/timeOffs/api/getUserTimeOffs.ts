import axios from "@lib/axios";
import { TimeOff } from "../types";
import { ExtractFnReturnType, QueryConfig } from "@lib/react-query";
import { useQuery } from "@tanstack/react-query";

export const getUserTimeOffs = async (): Promise<TimeOff[]> => {
    const response = await axios.get('/timeOff');
    return response.data;
};

type QueryFnType = typeof getUserTimeOffs;

type UseTimeOffOptions = {
    config?: QueryConfig<QueryFnType>;
}

export const useUserTimeOffs = ({ config }: UseTimeOffOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['timeOffs'],
        queryFn: () => getUserTimeOffs()
    });
};
