// Writes each page, as the server build renders it, into the client build's HTML, then removes
// the server build: the site is static, and the browser hydrates what it's served.
import { readFile, rm, writeFile } from "node:fs/promises";

type Page = "home" | "not-found";

const site = new URL("../build/site/", import.meta.url);
const server = new URL("../build/site-render/", import.meta.url);
const { render } = (await import(new URL("render.js", server).href)) as {
	render: (page: Page) => Promise<string>;
};
const pages: [string, Page][] = [
	["index.html", "home"],
	["404.html", "not-found"],
];
for (const [file, page] of pages) {
	const url = new URL(file, site);
	const template = await readFile(url, "utf8");
	if (!template.includes("<!--app-->"))
		throw new Error(`${file} has no <!--app--> outlet`);
	const markup = await render(page);
	// A function, so `$&` and the like in the markup are left as they are.
	await writeFile(
		url,
		template.replace("<!--app-->", () => markup),
	);
}
await rm(server, { recursive: true });
