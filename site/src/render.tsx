import { prerender } from "react-dom/static";
import { App } from "./App";
import { NotFound } from "./NotFound";

/** A page's markup, for its HTML's outlet: prerender.ts writes it at build time, and the dev
 *  server on every request. */
export async function render(page: "home" | "not-found"): Promise<string> {
	const { prelude } = await prerender(page === "home" ? <App /> : <NotFound />);
	return new Response(prelude).text();
}
