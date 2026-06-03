/// <reference types="vite/client" />

import type { AppRouter } from "@scope/api/trpc";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
const apiUrl = import.meta.env.VITE_API_URL || "/api";

const trpcClientConfig = {
  links: [
    httpBatchLink({
      url: apiUrl,
    }),
  ],
};

export const trpcClient = trpc.createClient(trpcClientConfig);
