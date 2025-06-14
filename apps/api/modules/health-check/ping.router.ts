import { createSuccessResponse } from "@utils/index.ts";
import { publicProcedure, router } from "@trpc/index.ts";
import { checkDatabaseConnection, pool } from "@db/index.ts";

const pingRouter = router({
  ping: publicProcedure.query(async () => {
    await checkDatabaseConnection(pool);
    return createSuccessResponse(
      "Health check request processed successfully",
      {
        greeting: "Hello World!",
      }
    );
  }),
});

export { pingRouter };
