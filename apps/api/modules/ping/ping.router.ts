import { assertPoolConnection, pool } from "@db";
import { createSuccessResponse, handleProcedure } from "@lib";
import { publicProcedure, router } from "@trpc";

const pingRouter = router({
  ping: publicProcedure.query(() =>
    handleProcedure(async () => {
      await assertPoolConnection(pool);

      return createSuccessResponse(
        "Health check request processed successfully",
        {
          greeting: "Hello World!",
        },
      );
    }, "check database health")
  ),
});

export { pingRouter };
