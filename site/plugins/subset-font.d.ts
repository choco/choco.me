// subset-font ships no types, and @types/subset-font stops at 2.3, before keepAllGlyphs.
declare module "subset-font" {
	interface Options {
		targetFormat?: "sfnt" | "woff" | "woff2";
		/** Keeps every glyph; `text` must then be null. */
		keepAllGlyphs?: boolean;
		/** Pins an axis to a value, or cuts it to a range. */
		variationAxes?: Record<
			string,
			number | { min: number; max: number; default?: number }
		>;
		/** Name table entries to keep beyond HarfBuzz's defaults. */
		preserveNameIds?: number[];
	}
	export default function subsetFont(
		font: Uint8Array,
		text: string | null,
		options?: Options,
	): Promise<Buffer>;
}
