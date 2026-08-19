import { readFile, writeFile } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import path from "path";
import { componentTagger } from "lovable-tagger";

const additionalWorkMdxPath = path.resolve(
  __dirname,
  "content/case-studies/additional-work-examples.mdx",
);

const isLocalRequest = (request: IncomingMessage) => {
  const address = request.socket.remoteAddress;
  return (
    address === "127.0.0.1" ||
    address === "::1" ||
    address === "::ffff:127.0.0.1"
  );
};

const sendResponse = (
  response: ServerResponse,
  status: number,
  body: string,
  contentType = "text/plain; charset=utf-8",
) => {
  response.writeHead(status, { "Content-Type": contentType });
  response.end(body);
};

const localMdxEditorApi = (): Plugin => ({
  name: "local-mdx-editor-api",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/__mdx-editor/case-study-4", async (request, response) => {
      if (!isLocalRequest(request)) {
        sendResponse(response, 403, "The MDX editor is only available locally.");
        return;
      }

      if (request.method === "GET") {
        try {
          sendResponse(response, 200, await readFile(additionalWorkMdxPath, "utf8"));
        } catch {
          sendResponse(response, 500, "Unable to read the case study.");
        }
        return;
      }

      if (request.method !== "PUT") {
        response.setHeader("Allow", "GET, PUT");
        sendResponse(response, 405, "Method not allowed.");
        return;
      }

      if (!request.headers["content-type"]?.startsWith("text/plain")) {
        sendResponse(response, 415, "Expected a plain-text MDX document.");
        return;
      }

      const chunks: Buffer[] = [];
      let size = 0;

      for await (const chunk of request) {
        const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        size += buffer.length;
        if (size > 1_000_000) {
          sendResponse(response, 413, "The MDX document is too large.");
          return;
        }
        chunks.push(buffer);
      }

      try {
        await writeFile(additionalWorkMdxPath, Buffer.concat(chunks).toString("utf8"), "utf8");
        sendResponse(
          response,
          200,
          JSON.stringify({ saved: true }),
          "application/json; charset=utf-8",
        );
      } catch {
        sendResponse(response, 500, "Unable to save the case study.");
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    localMdxEditorApi(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
