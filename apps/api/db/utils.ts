import { Pool, type PoolClient } from "pg";

function createPool(connectionString: string): Pool {
  return new Pool({
    connectionString,
    max: 10, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error if connection takes longer than 2 seconds
  });
}

async function closePool(pool: Pool): Promise<void> {
  await pool.end();
  console.log("Database connection pool closed");
}

async function assertPoolConnection(pool: Pool): Promise<void> {
  let client: PoolClient | undefined;

  try {
    client = await pool.connect();
    await client.query("SELECT 1");
    console.log("🚀 Connected to database");
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw error;
  }
}

export { assertPoolConnection, closePool, createPool };
