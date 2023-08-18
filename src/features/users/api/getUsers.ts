import axios from "@lib/axios";
import { User } from "../types";
import { ExtractFnReturnType, QueryConfig } from "@lib/react-query";
import { useQuery } from "@tanstack/react-query";

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get("/user/all");
    return response.data;
}

type QueryFnType = typeof getUsers;

type UseUsersOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useUsers = ({ config }: UseUsersOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['users'],
        queryFn: () => getUsers(),
    });
}