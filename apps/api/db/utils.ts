import { handleProcedure } from "@utils/index.ts";
import type { Pool } from "npm:pg";

async function checkDatabaseConnection(pool: Pool): Promise<boolean> {
  return await handleProcedure(async () => {
    const client = await pool.connect();
    try {
      // Simple query to check if database is accessible
      await client.query("SELECT 1");
      return true;
    } finally {
      client.release();
    }
  }, "connect to database");
}

// Clean shutdown function
async function closeDatabaseConnection(pool: Pool): Promise<void> {
  await pool.end();
  console.log("Database connection pool closed");
}

export { checkDatabaseConnection, closeDatabaseConnection };
