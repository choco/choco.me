import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { design } from "./plugins/design.ts";
import { notes } from "./plugins/notes.ts";

// The dev server serves each page rendered into its HTML's outlet, as the build's prerender.ts
// writes it, so hydration meets the same markup in both.
function renderInDev(): Plugin {
	return {
		name: "choco:render-in-dev",
		apply: "serve",
		transformIndexHtml: {
			order: "post",
			async handler(html, { server, path }) {
				if (!server) throw new Error("rendering a page needs the dev server");
				const { render } = await server.ssrLoadModule("/src/render.tsx");
				const markup = await render(
					path === "/404.html" ? "not-found" : "home",
				);
				return html.replace("<!--app-->", () => markup);
			},
		},
	};
}

export default defineConfig(({ command }) => ({
	// Absolute, since Pages serves 404.html at whatever path was missing.
	base: "/",
	plugins: [design(), notes(), tailwindcss(), react(), renderInDev()],
	css: {
		// Readable, and the same in the client and server builds, whose markup must match.
		modules: {
			generateScopedName: (name, filename) =>
				`${basename(filename).split(".")[0]}_${name}`,
		},
	},
	// A path that isn't a file is a 404, as on Pages, rather than the home page again.
	appType: "mpa",
	// The server build runs once, from outside the site's folder, so it carries its dependencies.
	ssr: command === "build" ? { noExternal: true } : {},
	build: {
		outDir: "../build/site",
		emptyOutDir: true,
		rolldownOptions: {
			input: {
				home: fileURLToPath(new URL("index.html", import.meta.url)),
				"not-found": fileURLToPath(new URL("404.html", import.meta.url)),
			},
			output: {
				assetFileNames: ({ names }) =>
					names.some((name) => name.endsWith(".woff2"))
						? "fonts/[name]-[hash][extname]"
						: "assets/[name]-[hash][extname]",
			},
		},
	},
}));
