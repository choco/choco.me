declare module "virtual:note-letters" {
	/** Each note line's letters, in em: each box's edges along the line, and how far it moves at
	 *  the top of the bounce (site/plugins/notes.ts). */
	const letters: Record<string, { x0: number; x1: number; dy: number }[]>;
	export default letters;
}
