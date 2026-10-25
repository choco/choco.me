import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createFontStack } from "@capsizecss/core";
import arial from "@capsizecss/metrics/arial";
import georgia from "@capsizecss/metrics/georgia";
import notoSerif from "@capsizecss/metrics/notoSerif";
import roboto from "@capsizecss/metrics/roboto";
import { fromBuffer } from "@capsizecss/unpack";
import subsetFont from "subset-font";
import type { Plugin } from "vite";

const choco = {
	design: fileURLToPath(new URL("../../design/", import.meta.url)),
	tokens: fileURLToPath(new URL("../../design/tokens.json", import.meta.url)),
	licences: fileURLToPath(new URL("../../design/licenses/", import.meta.url)),
	styles: fileURLToPath(new URL("../src/styles/", import.meta.url)),
	output: fileURLToPath(new URL("../src/styles/tokens.css", import.meta.url)),
};
const nightcap = {
	vendor: fileURLToPath(new URL("../vendor/nightcap/", import.meta.url)),
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
interface Font {
	family: string;
	weight: string;
	style?: string;
	file: string;
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
		fonts: Font[];
	};
}

export type Axes = Record<string, number | { min: number; max: number }>;

/** What the site sets of each variable face. Each axis here is pinned, or cut to a range, when the
 *  build copies the face, and the rest of its design space isn't shipped: a weight or axis value
 *  set outside these renders at the nearest one kept. */
export const KEPT: Record<string, Axes> = {
	Gluten: { slnt: 0 },
	"Shantell Sans": { wght: 500, INFM: 100, SPAC: 0, BNCE: 0 },
};

// The weight each face's stand-ins are sized at: the text a late face would move most, the hello in
// Gluten and paragraphs in the rest. A face cut to one weight is sized at that.
const MATCHED_AT: Record<string, number> = {
	Gluten: 900,
	Onest: 400,
	Caprasimo: 400,
	Figtree: 400,
};

/** The design system's font file for a family, and the axes the site keeps of it. */
export function face(family: string): { file: string; axes: Axes } {
	const tokens: Tokens = JSON.parse(readFileSync(choco.tokens, "utf8"));
	const font = tokens.type.fonts.find((font) => font.family === family);
	if (!font) throw new Error(`design/tokens.json has no ${family}`);
	return { file: choco.design + font.file, axes: KEPT[family] ?? {} };
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

// A face cut to a weight or a weight range offers that, whatever its file could.
function weight(font: Font): string {
	const wght = KEPT[font.family]?.wght;
	if (wght === undefined) return font.weight;
	return typeof wght === "number" ? `${wght}` : `${wght.min} ${wght.max}`;
}

const fontFaces = (tokens: Tokens, dir: string) =>
	tokens.type.fonts.map(
		(font) =>
			`@font-face{font-family:"${font.family}";src:url("${dir}${font.file}") format("woff2");font-weight:${weight(font)};font-style:${font.style ?? "normal"};font-display:swap}`,
	);

/** Stand-ins for a face while it loads: local fonts sized and spaced to the face's metrics, so the
 *  swap to it moves nothing. Their @font-face rules, and the face's stack with them after it. */
async function standIns(font: Font, file: string, stack: string) {
	const kept = KEPT[font.family] ?? {};
	const wght =
		typeof kept.wght === "number" ? kept.wght : MATCHED_AT[font.family];
	if (wght === undefined)
		throw new Error(`no weight to size ${font.family}'s stand-ins at`);
	const source = readFileSync(file);
	const variable = font.weight.includes(" ");
	const metrics = await fromBuffer(
		variable
			? await subsetFont(source, null, {
					targetFormat: "sfnt",
					keepAllGlyphs: true,
					variationAxes: { ...kept, wght },
				})
			: source,
	);
	const locals =
		stack.split(", ").at(-1) === "serif"
			? [georgia, notoSerif]
			: [arial, roboto];
	const { fontFamily, fontFaces } = createFontStack([
		{ ...metrics, familyName: font.family },
		...locals,
	]);
	// createFontStack lists the face, then a stand-in for each local font, then the locals.
	const named = fontFamily.split(", ").slice(1, 1 + locals.length);
	const [first, ...rest] = stack.split(", ");
	return { faces: fontFaces, stack: [first, ...named, ...rest].join(", ") };
}

/** Each family's stack with its face's stand-ins, and their @font-face rules. A family whose face
 *  `dir` doesn't ship keeps its stack. */
async function families(tokens: Tokens, dir: string, shipped: Set<string>) {
	const faces: string[] = [];
	const stacks: Record<string, string> = {};
	for (const [key, stack] of Object.entries(tokens.type.families)) {
		const family = stack.split(", ")[0].replaceAll('"', "");
		const font = tokens.type.fonts.find(
			(font) => font.family === family && font.style !== "italic",
		);
		if (!font || !shipped.has(family)) {
			stacks[key] = stack;
			continue;
		}
		const fitted = await standIns(font, dir + font.file, stack);
		faces.push(fitted.faces);
		stacks[key] = fitted.stack;
	}
	return { faces, stacks };
}

type Families = Awaited<ReturnType<typeof families>>;

/** choco.me's tokens as CSS: the fonts and their stand-ins, the themed tokens as variables, light
 *  on :root and dark for the dark system appearance unless the page was set to light, and for an
 *  explicit dark choice; the rest as plain variables; then Tailwind's theme from them. */
function chocoCss(tokens: Tokens, { faces, stacks }: Families): string {
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
		...fontFaces(tokens, "./"),
		...faces,
		`:root{${themedTokens.map((token) => `--${token.name}:${themed(file, token, "light")}`).join(";")};${plain.map(({ name, value }) => `--${name}:${value}`).join(";")};color-scheme:light}`,
		`@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${dark};color-scheme:dark}}`,
		`:root[data-theme="dark"]{${dark};color-scheme:dark}`,
		// Inline, so a utility reads the variable, which the theme (or a product's scope) switches.
		// The families as --family-* variables, which a product's scope can swap for its own faces.
		`:root{${Object.entries(stacks)
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

// The faces a Nightcap section sets.
const NIGHTCAP_FACES = new Set(["Caprasimo", "Figtree"]);

/** Nightcap's tokens, scoped to `.nc-scope`: its Day theme by default, its Night theme wherever
 *  choco.me is dark, so a Nightcap section follows the page. */
function nightcapCss(tokens: Tokens, { faces, stacks }: Families): string {
	const file = "site/vendor/nightcap/tokens.json";
	const all = [...tokens.color.tokens, ...(tokens.shadow?.tokens ?? [])];
	const night = all
		.filter((token) => typeof token.value === "object")
		.map((token) => `--${token.name}:${themed(file, token, "dark")}`)
		.join(";");
	return [
		`/* Generated from ${file} by site/plugins/design.ts. */`,
		...fontFaces(
			{
				...tokens,
				type: {
					...tokens.type,
					fonts: tokens.type.fonts.filter(
						(font) =>
							NIGHTCAP_FACES.has(font.family) && font.style !== "italic",
					),
				},
			},
			"../../vendor/nightcap/",
		),
		...faces,
		`.nc-scope{${all.map((token) => `--${token.name}:${themed(file, token, "light")}`).join(";")};${(tokens.radius?.tokens ?? []).map(({ name, value }) => `--${name}:${value}`).join(";")};--family-display:${stacks.display};--family-text:${stacks.text};color-scheme:light;font-family:var(--family-text);color:var(--ink)}`,
		`@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .nc-scope{${night};color-scheme:dark}}`,
		`:root[data-theme="dark"] .nc-scope{${night};color-scheme:dark}`,
		"",
	].join("\n");
}

function write(output: string, content: string | Uint8Array) {
	const data = typeof content === "string" ? Buffer.from(content) : content;
	// Unchanged content leaves the file alone, so the dev server doesn't reload for nothing.
	if (!existsSync(output) || !readFileSync(output).equals(data)) {
		mkdirSync(dirname(output), { recursive: true });
		writeFileSync(output, data);
	}
}

/** The design system's fonts beside the tokens, each variable face cut to what the site keeps. */
async function writeFonts(tokens: Tokens) {
	for (const family of Object.keys(KEPT))
		if (!tokens.type.fonts.some((font) => font.family === family))
			throw new Error(`design/tokens.json has no ${family} to cut`);
	await Promise.all(
		tokens.type.fonts.map(async (font) => {
			const source = readFileSync(choco.design + font.file);
			const axes = KEPT[font.family];
			write(
				choco.styles + font.file,
				axes
					? await subsetFont(source, null, {
							targetFormat: "woff2",
							keepAllGlyphs: true,
							variationAxes: axes,
							// The licence's description and address, which the OFL asks a copy to carry.
							preserveNameIds: [13, 14],
						})
					: source,
			);
		}),
	);
}

async function writeTokens() {
	const tokens: Tokens = JSON.parse(readFileSync(choco.tokens, "utf8"));
	const nightcapTokens: Tokens = JSON.parse(
		readFileSync(nightcap.tokens, "utf8"),
	);
	const shipped = new Set(tokens.type.fonts.map((font) => font.family));
	const [chocoFamilies, nightcapFamilies] = await Promise.all([
		families(tokens, choco.design, shipped),
		families(nightcapTokens, nightcap.vendor, NIGHTCAP_FACES),
		writeFonts(tokens),
	]);
	write(choco.output, chocoCss(tokens, chocoFamilies));
	write(nightcap.output, nightcapCss(nightcapTokens, nightcapFamilies));
}

/** What the site takes from the rest of the repo: src/styles/tokens.css from the design system's
 *  tokens, with its fonts cut to what the site keeps in src/styles/fonts/, and
 *  src/styles/nightcap.css from Nightcap's, each with stand-ins sized to its faces, all written
 *  before Vite reads anything and again when their sources change while serving; preloads for the
 *  first screen's fonts; and the licences, under licenses/ in the built site. */
export function design(): Plugin {
	return {
		name: "choco:design",
		async config() {
			await writeTokens();
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
