import "https://deno.land/std@0.220.1/dotenv/load.ts";

const API_LOCAL_PORT = Deno.env.get("API_LOCAL_PORT") || 3000;
const API_LOCAL_URL = `http://localhost:${API_LOCAL_PORT}`;

export const VITE_API_URL = Deno.env.get("VITE_API_URL") || API_LOCAL_URL;
