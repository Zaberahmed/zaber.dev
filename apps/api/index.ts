import { createServer } from "./server.ts";

const server = await createServer();

server.listen(() => {
  console.log(`🚀 Server is listening`);
});
