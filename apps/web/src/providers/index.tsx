import QueryProvider from "./QueryClient.provider.tsx";
import TRPCProvider from "./TRPC.provider.tsx";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <TRPCProvider>{children}</TRPCProvider>
    </QueryProvider>
  );
};

export default RootProvider;
