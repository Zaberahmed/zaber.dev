import { env } from "./lib/env.ts";
import { createServer } from "./server.ts";

const server = await createServer();

server.listen(env.API_LOCAL_PORT, () => {
  console.log(`🖥  Server is listening on ${env.API_LOCAL_PORT}`);
});
