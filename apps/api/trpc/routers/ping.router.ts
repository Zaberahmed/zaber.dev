import { createSuccessResponse } from "../../utils/index.ts";
import { publicProcedure, router } from "../index.ts";

const pingRouter = router({
  ping: publicProcedure.query(() => {
    return createSuccessResponse("Hello World request processed successfully", {
      greeting: "Hello World!",
    });
  }),
});

export { pingRouter };
