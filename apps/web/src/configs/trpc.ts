import type { AppRouter } from "@shared/types/index.ts";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();

const trpcClientConfig = {
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_API_URL}`,
    }),
  ],
};

export const trpcClient = trpc.createClient(trpcClientConfig);
