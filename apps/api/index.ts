import { createServer } from "./server.ts";

const server = createServer();

server.listen(3000);

console.log("🚀 Server ready at http://localhost:3000");
