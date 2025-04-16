import { router, publicProcedure } from "../index.ts";

const helloRouter = router({
  hello: publicProcedure.query(() => {
    return {
      greeting: "Hello World!",
    };
  }),
});

export { helloRouter };
