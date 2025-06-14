import {
  serveDir,
  serveFile,
} from "https://deno.land/std@0.224.0/http/file_server.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

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
    // File doesn't exist, continue to check if we should fallback
  }

  // Only serve index.html for routes that don't look like asset files
  // Asset files typically have extensions like .js, .css, .png, .svg, etc.
  const isAssetFile = /\.[a-zA-Z0-9]+$/.test(pathname);

  if (!isAssetFile) {
    // For non-existent routes (like SPA routes), serve index.html
    // This enables client-side routing to work on page refresh
    return serveFile(req, "apps/web/dist/index.html");
  }

  // For missing asset files, return 404
  return new Response("Not Found", { status: 404 });
});
