/**
 * Bun Fullstack Server
 * Uses Bun's native HTTP server with:
 * - HTML imports for client-side bundling
 * - YAML imports for data
 * - Hot reloading in development
 * - Static file serving
 */

import enIndexHtml from "./pages/en/index.html";
// Import HTML files as modules (Bun bundles them automatically)
import enIndexHtml from "./pages/en/index.html";
import indexHtml from "./pages/index.html";

/**
 * Profile data interface for type validation
 */
interface ProfileData {
	name?: string;
	title?: string;
	contact?: Record<string, string>;
	summary?: string;
}

/**
 * Validates that the imported profile data has the expected structure
 */
function validateProfileData(data: unknown, source: string): ProfileData {
	if (!data || typeof data !== "object" || Array.isArray(data)) {
		throw new Error(
			`Invalid profile data from ${source}: expected an object, got ${Array.isArray(data) ? "array" : typeof data}`,
		);
	}
	return data as ProfileData;
}

/**
 * Safely load YAML data with error handling
 * Returns the data if successful, or an error response object if failed
 */
function loadYamlData<T>(
	loader: () => T,
	source: string,
	validator?: (data: unknown, source: string) => T,
): { data: T | null; error: string | null } {
	try {
		const rawData = loader();
		if (validator) {
			return { data: validator(rawData, source), error: null };
		}
		return { data: rawData, error: null };
	} catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : "Unknown error occurred";
		console.error(`❌ Failed to load YAML data from ${source}: ${errorMessage}`);
		return { data: null, error: errorMessage };
	}
}

// Load YAML data with error handling
let profilePtBR: ProfileData | null = null;
let profileEn: ProfileData | null = null;
let yamlLoadErrors: string[] = [];

try {
	// Dynamic imports wrapped in try-catch for better error handling
	const ptBRModule = await import("../data/pt-BR/profile.yaml");
	const ptBRResult = loadYamlData(
		() => ptBRModule.default,
		"data/pt-BR/profile.yaml",
		validateProfileData,
	);
	if (ptBRResult.error) {
		yamlLoadErrors.push(`PT-BR Profile: ${ptBRResult.error}`);
	} else {
		profilePtBR = ptBRResult.data;
	}
} catch (err) {
	const errorMessage =
		err instanceof Error ? err.message : "Unknown error occurred";
	yamlLoadErrors.push(`PT-BR Profile: ${errorMessage}`);
	console.error(
		`❌ Failed to import PT-BR profile YAML: ${errorMessage}`,
	);
}

try {
	const enModule = await import("../data/en/profile.yaml");
	const enResult = loadYamlData(
		() => enModule.default,
		"data/en/profile.yaml",
		validateProfileData,
	);
	if (enResult.error) {
		yamlLoadErrors.push(`EN Profile: ${enResult.error}`);
	} else {
		profileEn = enResult.data;
	}
} catch (err) {
	const errorMessage =
		err instanceof Error ? err.message : "Unknown error occurred";
	yamlLoadErrors.push(`EN Profile: ${errorMessage}`);
	console.error(`❌ Failed to import EN profile YAML: ${errorMessage}`);
}

// Log warnings if any YAML files failed to load
if (yamlLoadErrors.length > 0) {
	console.warn(
		`⚠️ Some YAML files failed to load. API endpoints may return errors.`,
	);
	console.warn(`   Errors: ${yamlLoadErrors.join("; ")}`);
}

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

		// API endpoints for data with error handling
		"/api/data/pt-BR/profile": () => {
			if (profilePtBR === null) {
				return Response.json(
					{
						error: "Profile data unavailable",
						message:
							"PT-BR profile YAML file is missing or malformed. Check server logs for details.",
					},
					{ status: 503 },
				);
			}
			return Response.json(profilePtBR);
		},
		"/api/data/en/profile": () => {
			if (profileEn === null) {
				return Response.json(
					{
						error: "Profile data unavailable",
						message:
							"EN profile YAML file is missing or malformed. Check server logs for details.",
					},
					{ status: 503 },
				);
			}
			return Response.json(profileEn);
		},

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
console.log(`📄 PT-BR page: ${server.url}`);
console.log(`📄 EN page: ${server.url}en/`);

if (isDev) {
	console.log(`🔥 Hot reload enabled - edit files and see changes instantly!`);
}
