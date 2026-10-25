import type { ReactNode } from "react";
import { cx } from "../lib/cx";
import { vars } from "../lib/vars";
import { Doodle } from "./icons";
import styles from "./Note.module.css";

/** A handwritten aside with the curly arrow, turned to point at its subject from the words. */
export function Note({
	flavour,
	arrow,
	arrowFirst = false,
	className,
	children,
}: {
	flavour: "strawberry" | "pistachio" | "lavender";
	/** The arrow's turn, as a CSS transform. */
	arrow: string;
	arrowFirst?: boolean;
	className?: string;
	children: ReactNode;
}) {
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
		>
			{arrowFirst && mark}
			<span>{children}</span>
			{!arrowFirst && mark}
		</span>
	);
}
