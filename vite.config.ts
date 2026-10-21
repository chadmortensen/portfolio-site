import { readFile, writeFile } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import path from "path";
import { componentTagger } from "lovable-tagger";
import {
  OTHER_THEME,
  THEME_GROUPS,
  buildPublicData,
  loadKnowledgeGraph,
  updateKnowledgeGraphFile,
} from "./scripts/chad-mapped.mjs";

const editableCaseStudies = new Map([
  ["case-study-1", "baby-registry-revamp.mdx"],
  ["case-study-2", "etsy-fulfillment-vision.mdx"],
  ["case-study-3", "brightside-growth-vision.mdx"],
  ["case-study-4", "additional-work-examples.mdx"],
]);

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
    server.middlewares.use("/__mdx-editor", async (request, response) => {
      if (!isLocalRequest(request)) {
        sendResponse(response, 403, "The MDX editor is only available locally.");
        return;
      }

      const slug = request.url?.split("?")[0].replace(/^\//, "") ?? "";
      const filename = editableCaseStudies.get(slug);
      if (!filename) {
        sendResponse(response, 404, "This case study does not have an MDX editor.");
        return;
      }

      const mdxPath = path.resolve(__dirname, "content/case-studies", filename);

      if (request.method === "GET") {
        try {
          sendResponse(response, 200, await readFile(mdxPath, "utf8"));
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
        await writeFile(mdxPath, Buffer.concat(chunks).toString("utf8"), "utf8");
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

// Local-only API behind /chad-mapped/edit. It reads the personal-knowledge-graph repo
// (CHAD_MAPPED_KG_PATH, default ../personal-knowledge-graph) and writes publish state back to it.
const localChadMappedApi = (): Plugin => ({
  name: "local-chad-mapped-api",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/__chad-mapped", async (request, response) => {
      if (!isLocalRequest(request)) {
        sendResponse(response, 403, "The mind map editor is only available locally.");
        return;
      }

      const json = (nodes: Record<string, unknown>[], publicData = buildPublicData(nodes)) =>
        sendResponse(
          response,
          200,
          JSON.stringify({ nodes, publicData, themes: [...Object.keys(THEME_GROUPS), OTHER_THEME] }),
          "application/json; charset=utf-8",
        );

      try {
        if (request.method === "GET") {
          json(await loadKnowledgeGraph());
          return;
        }

        if (request.method !== "PUT") {
          response.setHeader("Allow", "GET, PUT");
          sendResponse(response, 405, "Method not allowed.");
          return;
        }

        const chunks: Buffer[] = [];
        for await (const chunk of request) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        const { id, ...update } = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        const result = await updateKnowledgeGraphFile(String(id), update);
        json(result.nodes, result.publicData);
      } catch (error) {
        sendResponse(response, 400, error instanceof Error ? error.message : "Unable to update the knowledge graph.");
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
    localChadMappedApi(),
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
