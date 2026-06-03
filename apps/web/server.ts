import { serveDir, serveFile } from "@std/http/file-server";

const apiProxyUrl = Deno.env.get("API_PROXY_URL") ||
  "https://zaber-api.deno.dev";

function createProxyUrl(requestUrl: URL): URL {
  const apiUrl = new URL(apiProxyUrl);
  const apiBasePath = apiUrl.pathname.replace(/\/$/, "");
  const proxiedPath = requestUrl.pathname.replace(/^\/api/, "") || "/";

  apiUrl.pathname = `${apiBasePath}${proxiedPath}`;
  apiUrl.search = requestUrl.search;

  return apiUrl;
}

function createProxyHeaders(req: Request): Headers {
  const headers = new Headers(req.headers);
  headers.delete("host");
  return headers;
}

async function proxyApiRequest(req: Request, url: URL): Promise<Response> {
  const proxiedUrl = createProxyUrl(url);
  const canHaveBody = req.method !== "GET" && req.method !== "HEAD";

  return await fetch(proxiedUrl, {
    method: req.method,
    headers: createProxyHeaders(req),
    body: canHaveBody ? req.body : undefined,
    redirect: "manual",
  });
}

Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
    return await proxyApiRequest(req, url);
  }

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
