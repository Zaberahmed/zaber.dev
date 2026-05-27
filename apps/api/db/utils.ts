import { handleProcedure } from "@utils/index.ts";
import { Pool } from "pg";

function createPool(connectionString: string): Pool {
  return new Pool({
    connectionString,
    max: 10, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error if connection takes longer than 2 seconds
  });
}
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

async function closeDatabaseConnection(pool: Pool): Promise<void> {
  await pool.end();
  console.log("Database connection pool closed");
}

export { createPool, checkDatabaseConnection, closeDatabaseConnection };
