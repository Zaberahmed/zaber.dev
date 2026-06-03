import { env } from "@lib";
import { createServer } from "./server.ts";

const server = await createServer();

if (env.DEPLOYMENT_MODE === "local") {
  const apiLocalPort = env.API_LOCAL_PORT;

  server.listen(apiLocalPort, () => {
    console.log(`🖥  Server is listening on ${apiLocalPort}`);
  });
} else {
  server.listen(() => {
    console.log("🖥  Server is listening");
  });
}
