import "https://deno.land/std@0.220.1/dotenv/load.ts";
import { createServer } from "./server.ts";

const server = createServer();
const port = Deno.env.get("API_LOCAL_PORT") || 3000;

server.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
