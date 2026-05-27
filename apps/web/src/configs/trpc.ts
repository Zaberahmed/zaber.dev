import type { AppRouter } from "@scope/api/trpc";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();

const trpcClientConfig = {
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_APP_URL}`,
    }),
  ],
};

export const trpcClient = trpc.createClient(trpcClientConfig);
