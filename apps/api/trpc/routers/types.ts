import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./index.ts";

// Infer router input and output types
type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

// Helper types for specific procedures
type ProcedureInput<
  Router extends keyof RouterInput,
  Method extends keyof RouterInput[Router]
> = RouterInput[Router][Method];

type ProcedureOutput<
  Router extends keyof RouterOutput,
  Method extends keyof RouterOutput[Router]
> = RouterOutput[Router][Method];

export type {
  AppRouter,
  RouterInput,
  RouterOutput,
  ProcedureInput,
  ProcedureOutput,
};
