import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

const choco = {
	tokens: fileURLToPath(new URL("../../design/tokens.json", import.meta.url)),
	licences: fileURLToPath(new URL("../../design/licenses/", import.meta.url)),
	output: fileURLToPath(new URL("../src/styles/tokens.css", import.meta.url)),
};
const nightcap = {
	tokens: fileURLToPath(
		new URL("../vendor/nightcap/tokens.json", import.meta.url),
	),
	licences: fileURLToPath(
		new URL("../vendor/nightcap/licenses/", import.meta.url),
	),
	output: fileURLToPath(new URL("../src/styles/nightcap.css", import.meta.url)),
};

type Value = string | { light?: string; dark?: string };
interface Token<V = string> {
	name: string;
	value: V;
}
interface Tokens {
	color: { tokens: Token<Value>[] };
	spacing?: { tokens: Token[] };
	radius?: { tokens: Token[] };
	shadow?: { tokens: Token<Value>[] };
	layout?: { tokens: Token[] };
	easing?: { tokens: Token[] };
	duration?: { tokens: Token[] };
	type: {
		families: Record<string, string>;
		fonts: { family: string; weight: string; style?: string; file: string }[];
	};
}

// A value that names another token, such as "{cocoa}", is that token's variable.
const css = (value: string) =>
	/^\{.+\}$/.test(value) ? `var(--${value.slice(1, -1)})` : value;

// A value missing a theme takes the other's.
function themed(
	file: string,
	token: Token<Value>,
	theme: "light" | "dark",
): string {
	const { value } = token;
	if (typeof value === "string") return css(value);
	const picked = value[theme] ?? value[theme === "light" ? "dark" : "light"];
	if (picked === undefined)
		throw new Error(`${file}: ${token.name} has no value`);
	return css(picked);
}

const fontFaces = (tokens: Tokens, dir: string) =>
	tokens.type.fonts.map(
		(font) =>
			`@font-face{font-family:"${font.family}";src:url("${dir}${font.file}") format("woff2");font-weight:${font.weight};font-style:${font.style ?? "normal"};font-display:swap}`,
	);

/** choco.me's tokens as CSS: the fonts, the themed tokens as variables, light on :root and dark
 *  for the dark system appearance unless the page was set to light, and for an explicit dark
 *  choice; the rest as plain variables; then Tailwind's theme from them. */
function chocoCss(tokens: Tokens): string {
	const file = "design/tokens.json";
	const themedTokens = [
		...tokens.color.tokens,
		...(tokens.shadow?.tokens ?? []),
	];
	const dark = themedTokens
		.filter((token) => typeof token.value === "object")
		.map((token) => `--${token.name}:${themed(file, token, "dark")}`)
		.join(";");
	// The spacing tokens are Tailwind's 4px scale, space-N being N steps.
	for (const { name, value } of tokens.spacing?.tokens ?? []) {
		const steps = Number(name.replace(/^space-/, ""));
		if (value !== `${steps * 4}px`)
			throw new Error(`${file}: ${name} is ${value}, off the 4px scale`);
	}
	const plain = [
		...(tokens.spacing?.tokens ?? []),
		...(tokens.layout?.tokens ?? []),
		...(tokens.easing?.tokens ?? []),
		...(tokens.duration?.tokens ?? []),
	];
	return [
		`/* Generated from ${file} by site/plugins/design.ts. */`,
		...fontFaces(tokens, "../../../design/"),
		`:root{${themedTokens.map((token) => `--${token.name}:${themed(file, token, "light")}`).join(";")};${plain.map(({ name, value }) => `--${name}:${value}`).join(";")};color-scheme:light}`,
		`@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${dark};color-scheme:dark}}`,
		`:root[data-theme="dark"]{${dark};color-scheme:dark}`,
		// Inline, so a utility reads the variable, which the theme (or a product's scope) switches.
		// The families as --family-* variables, which a product's scope can swap for its own faces.
		`:root{${Object.entries(tokens.type.families)
			.map(([family, stack]) => `--family-${family}:${stack}`)
			.join(";")}}`,
		`@theme inline{--color-*:initial;${tokens.color.tokens.map(({ name }) => `--color-${name}:var(--${name})`).join(";")};--font-*:initial;${Object.keys(
			tokens.type.families,
		)
			.map((family) => `--font-${family}:var(--family-${family})`)
			.join(";")}}`,
		`@theme static{--spacing:4px;--radius-*:initial;--shadow-*:initial;${(tokens.radius?.tokens ?? []).map(({ name, value }) => `--${name}:${value}`).join(";")}}`,
		"",
	].join("\n");
}

/** Nightcap's tokens, scoped to `.nc-scope`: its Day theme by default, its Night theme wherever
 *  choco.me is dark, so a Nightcap section follows the page. */
function nightcapCss(tokens: Tokens): string {
	const file = "site/vendor/nightcap/tokens.json";
	const all = [...tokens.color.tokens, ...(tokens.shadow?.tokens ?? [])];
	const night = all
		.filter((token) => typeof token.value === "object")
		.map((token) => `--${token.name}:${themed(file, token, "dark")}`)
		.join(";");
	const used = new Set(["Caprasimo", "Figtree"]);
	return [
		`/* Generated from ${file} by site/plugins/design.ts. */`,
		...fontFaces(
			{
				...tokens,
				type: {
					...tokens.type,
					fonts: tokens.type.fonts.filter(
						(font) => used.has(font.family) && font.style !== "italic",
					),
				},
			},
			"../../vendor/nightcap/",
		),
		`.nc-scope{${all.map((token) => `--${token.name}:${themed(file, token, "light")}`).join(";")};${(tokens.radius?.tokens ?? []).map(({ name, value }) => `--${name}:${value}`).join(";")};--family-display:${tokens.type.families.display};--family-text:${tokens.type.families.text};color-scheme:light;font-family:var(--family-text);color:var(--ink)}`,
		`@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .nc-scope{${night};color-scheme:dark}}`,
		`:root[data-theme="dark"] .nc-scope{${night};color-scheme:dark}`,
		"",
	].join("\n");
}

function write(output: string, content: string) {
	// Unchanged content leaves the file alone, so the dev server doesn't reload for nothing.
	if (!existsSync(output) || readFileSync(output, "utf8") !== content)
		writeFileSync(output, content);
}

function writeTokens() {
	write(choco.output, chocoCss(JSON.parse(readFileSync(choco.tokens, "utf8"))));
	write(
		nightcap.output,
		nightcapCss(JSON.parse(readFileSync(nightcap.tokens, "utf8"))),
	);
}

/** What the site takes from the rest of the repo: src/styles/tokens.css from the design system's
 *  tokens and src/styles/nightcap.css from Nightcap's, both written before Vite reads anything
 *  and again when their sources change while serving; preloads for the first screen's fonts; and
 *  the licences, under licenses/ in the built site. */
export function design(): Plugin {
	return {
		name: "choco:design",
		config() {
			writeTokens();
		},
		configureServer(server) {
			server.watcher.add([choco.tokens, nightcap.tokens]);
			server.watcher.on("change", (path) => {
				if (path === choco.tokens || path === nightcap.tokens) writeTokens();
			});
		},
		// The faces the first screen sets (the headline's and the text's), preloaded so the headline
		// doesn't wait for the stylesheet to ask for them. Only a build knows their hashed names.
		transformIndexHtml: {
			order: "post",
			handler(_html, { bundle }) {
				if (!bundle) return [];
				return Object.keys(bundle)
					.filter((name) => /^fonts\/(Gluten|Onest)-.*\.woff2$/.test(name))
					.map((name) => ({
						tag: "link",
						attrs: {
							rel: "preload",
							href: `/${name}`,
							as: "font",
							type: "font/woff2",
							crossorigin: "",
						},
						injectTo: "head" as const,
					}));
			},
		},
		generateBundle() {
			if (this.environment.name !== "client") return;
			for (const dir of [choco.licences, nightcap.licences]) {
				for (const licence of readdirSync(dir).filter((name) =>
					name.endsWith(".txt"),
				)) {
					this.emitFile({
						type: "asset",
						fileName: `licenses/${licence}`,
						source: readFileSync(dir + licence),
					});
				}
			}
		},
	};
}
