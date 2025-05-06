import type { ReactNode } from "react";
import { queryClient } from "../configs/tanstack-query.ts";
import { trpc as TRPC, trpcClient } from "../configs/trpc.ts";

interface TRPCProviderProps {
  children: ReactNode;
}

const TRPCProvider = ({ children }: TRPCProviderProps) => {
  return (
    <TRPC.Provider
      client={trpcClient}
      //deno-lint-ignore no-explicit-any
      queryClient={queryClient as any}>
      {children}
    </TRPC.Provider>
  );
};
export default TRPCProvider;
