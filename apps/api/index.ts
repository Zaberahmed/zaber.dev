import "https://deno.land/std@0.220.1/dotenv/load.ts";
import { createServer } from "./server.ts";

const port = Deno.env.get("API_LOCAL_PORT") || 6200;
const denoDeploymentId = Deno.env.get("DENO_DEPLOYMENT_ID");

const server = createServer();

server.listen(port, () => {
  if (!denoDeploymentId) {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  }
});
