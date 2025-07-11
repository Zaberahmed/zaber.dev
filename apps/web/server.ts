import {
  serveDir,
  serveFile,
} from "https://deno.land/std@0.224.0/http/file_server.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // Try to serve the requested file
  try {
    const response = await serveDir(req, {
      fsRoot: "apps/web/dist",
      urlRoot: "",
      quiet: true, // Suppress 404 logs for non-existent files
    });

    // If the file exists and is served successfully, return it
    // Also check if this is a request for a static asset (has file extension)
    const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(url.pathname);

    if (
      response.status === 200 ||
      (hasFileExtension && response.status !== 404)
    ) {
      return response;
    }

    // If it's a static asset request but we got 404, don't fall back to index.html
    if (hasFileExtension && response.status === 404) {
      return response;
    }
  } catch {
    // If there's an error and it's a static asset request, return 404
    const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(url.pathname);
    if (hasFileExtension) {
      return new Response("Not Found", { status: 404 });
    }
  }

  // For non-existent files without extensions (like SPA routes), serve index.html
  // This enables client-side routing to work on page refresh
  return serveFile(req, "apps/web/dist/index.html");
});
