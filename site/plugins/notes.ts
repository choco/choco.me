import { readFileSync } from "node:fs";
import { Blob, Face, Font, Buffer as Run, shape, Variation } from "harfbuzzjs";
import subsetFont from "subset-font";
import type { Plugin } from "vite";
import { NOTES } from "../src/data/notes.ts";
import { face } from "./design.ts";

/** One letter of a note's line, in em: its box's edges along the line, halfway to its neighbours'
 *  ink, and how far it moves at the top of the bounce. */
interface Letter {
	x0: number;
	x1: number;
	dy: number;
}

// How far the notes bounce, on Shantell Sans' bounce axis.
const BOUNCE = 70;
// How far the first and last letters' boxes reach past their ink.
const MARGIN = 0.3;
const ID = "virtual:note-letters";

// A thousandth of an em is under half the tightest gap between two letters' ink.
const em = (units: number, upem: number) =>
	Math.round((units / upem) * 1e3) / 1e3;

function letters(
	font: Font,
	lifted: Font,
	upem: number,
	line: string,
): Letter[] {
	const run = new Run();
	run.addText(line);
	run.guessSegmentProperties();
	shape(font, run);
	const positions = run.getGlyphPositions();
	const inks: { left: number; right: number; lift: number }[] = [];
	let x = 0;
	for (const [i, glyph] of run.getGlyphInfos().entries()) {
		const ink = font.glyphExtents(glyph.codepoint);
		const top = lifted.glyphExtents(glyph.codepoint);
		if (ink && top && ink.width > 0) {
			const left = x + positions[i].xOffset + ink.xBearing;
			inks.push({
				left,
				right: left + ink.width,
				lift: top.yBearing - ink.yBearing,
			});
		}
		x += positions[i].xAdvance;
	}
	for (const [i, ink] of inks.slice(1).entries())
		if (ink.left < inks[i].right)
			throw new Error(
				`"${line}": two letters' ink overlaps, so their boxes can't part them`,
			);
	return inks.map((ink, i) => ({
		x0: em(
			i === 0 ? ink.left - MARGIN * upem : (inks[i - 1].right + ink.left) / 2,
			upem,
		),
		x1: em(
			i === inks.length - 1
				? ink.right + MARGIN * upem
				: (ink.right + inks[i + 1].left) / 2,
			upem,
		),
		dy: em(-ink.lift, upem),
	}));
}

async function read(): Promise<Record<string, Letter[]>> {
	const { file, axes } = face("Shantell Sans");
	// The face as the site ships it, but keeping the bounce axis, to read how far each glyph moves.
	const sfnt = await subsetFont(readFileSync(file), null, {
		targetFormat: "sfnt",
		keepAllGlyphs: true,
		variationAxes: { ...axes, BNCE: { min: 0, max: BOUNCE } },
	});
	const shantell = new Face(new Blob(sfnt));
	const font = new Font(shantell);
	const lifted = new Font(shantell);
	lifted.setVariations([new Variation("BNCE", BOUNCE)]);
	return Object.fromEntries(
		Object.values(NOTES)
			.flat()
			.map((line) => [line, letters(font, lifted, shantell.upem, line)]),
	);
}

/** `virtual:note-letters`: each line of the notes in src/data/notes.ts, as its letters, shaped by
 *  HarfBuzz from Shantell Sans as the browser shapes them, so a note can bounce letter by letter. */
export function notes(): Plugin {
	let module: Promise<string> | undefined;
	return {
		name: "choco:notes",
		resolveId: (source) => (source === ID ? `\0${ID}` : undefined),
		load(id) {
			if (id !== `\0${ID}`) return;
			module ??= read().then(
				(letters) => `export default ${JSON.stringify(letters)};`,
			);
			return module;
		},
	};
}
