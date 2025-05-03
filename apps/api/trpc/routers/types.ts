import type { appRouter } from "./index.ts";
import type {
  inferProcedureInput,
  inferProcedureOutput,
  inferRouterOutputs,
  inferRouterInputs,
} from "@trpc/server";

// Export type router type signature, NOT the router itself.
export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type TPath = keyof AppRouter["_def"]["procedures"] & string;
export type ProcedureInput = inferProcedureInput<
  AppRouter["_def"]["procedures"][TPath]
>;
export type ProcedureOutput = inferProcedureOutput<
  AppRouter["_def"]["procedures"][TPath]
>;
