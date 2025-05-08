import { router, publicProcedure } from "../index.ts";
import { createSuccessResponse } from "../../utils/response.ts";

const helloRouter = router({
  hello: publicProcedure.query(() => {
    return createSuccessResponse("Hello World request processed successfully", {
      greeting: "Hello World!",
    });
  }),
});

export { helloRouter };
