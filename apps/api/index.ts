import { createServer } from "./server.ts";
import { DEPLOYMENT_ENV } from "./constants/global.constant.ts";

const port = Deno.env.get("API_LOCAL_PORT") || 6200;
const isProductionEnv = DEPLOYMENT_ENV === "production";

const server = await createServer();

server.listen(port, () => {
  if (!isProductionEnv) {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  }
});
