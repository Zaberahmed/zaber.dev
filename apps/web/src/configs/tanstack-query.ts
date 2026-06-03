import { QueryClient } from "@tanstack/react-query";
import { TimeConstants } from "@scope/constants";

const queryOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: TimeConstants.FIVE_MINUTES * 1000,
    cacheTime: TimeConstants.TEN_MINUTES * 1000,
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
