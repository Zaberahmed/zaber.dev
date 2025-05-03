import { QueryClient } from "@tanstack/react-query";
import { TimeConstants } from "../constants/index.ts";

const queryOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: TimeConstants.FIVE_MINUTES,
    cacheTime: TimeConstants.TEN_MINUTES,
  },
  mutations: {
    retry: false,
    onError: (error: Error) => {
      console.error("Mutation error:", error.message);
    },
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryOptions,
});
