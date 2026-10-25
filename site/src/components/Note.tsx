import letters from "virtual:note-letters";
import { Fragment, useEffect, useState } from "react";
import { cx } from "../lib/cx";
import { vars } from "../lib/vars";
import { Doodle } from "./icons";
import styles from "./Note.module.css";

/** Whether the face a CSS font shorthand names has loaded. */
function useLoaded(font: string) {
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		document.fonts.load(font).then((faces) => {
			if (faces.length === 0) throw new Error(`no face for ${font}`);
			setLoaded(true);
		});
	}, [font]);
	return loaded;
}

/** One line of a note, bouncing letter by letter once `loaded`. Each letter is a box the width of
 *  that letter holding a copy of the whole line, drawn by CSS and offset back into place, so the
 *  letter is shaped as it is in the line; the real line underneath is what's read, selected and
 *  found. */
function Line({ text, loaded }: { text: string; loaded: boolean }) {
	const line = letters[text];
	if (!line)
		throw new Error(
			`"${text}" isn't in src/data/notes.ts, so the build hasn't read its letters`,
		);
	return (
		<span
			className={styles.line}
			style={vars({ "--text": JSON.stringify(text) })}
		>
			<span className={styles.words}>{text}</span>
			{loaded && (
				<span className={styles.letters} aria-hidden="true">
					{line.map((letter) => (
						<span
							key={letter.x0}
							style={vars({
								"--x0": `${letter.x0}`,
								"--x1": `${letter.x1}`,
								"--dy": `${letter.dy}`,
							})}
						/>
					))}
				</span>
			)}
		</span>
	);
}

/** A handwritten aside with the curly arrow, turned to point at its subject from the words. Its
 *  letters take over from the plain line once Shantell Sans has loaded, since their edges fit that
 *  face alone; until then, and in the prerendered page, there's only the line. */
export function Note({
	flavour,
	arrow,
	arrowFirst = false,
	className,
	lines,
}: {
	flavour: "strawberry" | "pistachio" | "lavender";
	/** The arrow's turn, as a CSS transform. */
	arrow: string;
	arrowFirst?: boolean;
	className?: string;
	/** The note's words, from src/data/notes.ts. */
	lines: readonly string[];
}) {
	const loaded = useLoaded('500 1em "Shantell Sans"');
	const mark = (
		<Doodle
			kind="arrow"
			className={styles.arrow}
			style={{ transform: arrow }}
		/>
	);
	return (
		<span
			className={cx(styles.note, className)}
			style={vars({ "--note": `var(--${flavour}-text)` })}
			data-loaded={loaded || undefined}
		>
			{arrowFirst && mark}
			{/* Translated, the real line would no longer match the letters drawn over it. */}
			<span translate="no">
				{lines.map((line, i) => (
					<Fragment key={line}>
						{i > 0 && <br />}
						<Line text={line} loaded={loaded} />
					</Fragment>
				))}
			</span>
			{!arrowFirst && mark}
		</span>
	);
}
