/**
 * Bun Fullstack Server
 * Uses Bun's native HTTP server with:
 * - HTML imports for client-side bundling
 * - YAML imports for data
 * - Hot reloading in development
 * - Static file serving
 */

// Import YAML data using Bun's native YAML support
import profileEn from "../data/en/profile.yaml";
import profilePtBR from "../data/pt-BR/profile.yaml";
// Import HTML files as modules (Bun bundles them automatically)
import enIndexHtml from "./pages/en/index.html";
import indexHtml from "./pages/index.html";

const isDev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || '3000', 10) || 3000;

console.log(
	`🚀 Starting server in ${isDev ? "development" : "production"} mode...`,
);

const server = Bun.serve({
	port,

	// Route configuration (Bun v1.2.3+)
	routes: {
		// Main pages - HTML imports are automatically bundled
		"/": indexHtml,
		"/en": enIndexHtml,
		"/en/": enIndexHtml,

		// API endpoints for data
		"/api/data/pt-BR/profile": () => Response.json(profilePtBR),
		"/api/data/en/profile": () => Response.json(profileEn),

		// Health check endpoint
		"/api/health": () =>
			Response.json({
				status: "ok",
				timestamp: new Date().toISOString(),
				mode: isDev ? "development" : "production",
			}),

		// Redirect trailing slash
		"/index.html": Response.redirect("/", 301),
	},

	// Fallback for unmatched routes (static files, etc.)
	async fetch(req) {
		const url = new URL(req.url);
		const pathname = url.pathname;

		// Serve static files from public directory
		if (pathname.startsWith("/public/")) {
			const filePath = `.${pathname}`;
			const file = Bun.file(filePath);
			if (await file.exists()) {
				return new Response(file);
			}
		}

		// Serve CNAME for GitHub Pages
		if (pathname === "/CNAME") {
			const file = Bun.file("./CNAME");
			if (await file.exists()) {
				return new Response(file);
			}
		}

		// 404 fallback
		return new Response("Not Found", { status: 404 });
	},

	// Development options
	development: isDev,
});

console.log(`✅ Server running at ${server.url}`);
console.log(`📄 PT-BR: ${server.url}`);
console.log(`📄 EN: ${server.url}en/`);

if (isDev) {
	console.log(`🔥 Hot reload enabled - edit files and see changes instantly!`);
}
