import { router, publicProcedure } from "../index.ts";
import { createSuccessResponse } from "../../utils/index.ts";
import { checkDatabaseConnection } from "../../db/index.ts";

const pingRouter = router({
  ping: publicProcedure.query(() => {
    return createSuccessResponse("Hello World request processed successfully", {
      greeting: "Hello World!",
    });
  }),
  checkDB: publicProcedure.query(async () => {
    const isConnected = await checkDatabaseConnection();
    return createSuccessResponse("Database connection check completed", {
      connected: isConnected,
    });
  }),
});

export { pingRouter };
