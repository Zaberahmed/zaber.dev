import {
  serveDir,
  serveFile,
} from "https://deno.land/std@0.224.0/http/file_server.ts";

Deno.serve(async (req) => {
  // Try to serve the requested file
  try {
    const response = await serveDir(req, {
      fsRoot: "apps/web/dist",
      urlRoot: "",
      quiet: true, // Suppress 404 logs for non-existent files
    });

    // If the file exists and is served successfully, return it
    if (response.status === 200) {
      return response;
    }
  } catch {
    // File doesn't exist, continue to fallback
  }

  // For non-existent files (like SPA routes), serve index.html
  // This enables client-side routing to work on page refresh
  return serveFile(req, "apps/web/dist/index.html");
});
