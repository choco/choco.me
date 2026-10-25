import { type ReactNode, type RefObject, useEffect } from "react";
import { cx } from "../lib/cx";
import { vars } from "../lib/vars";
import styles from "./Doodles.module.css";
import { Doodle, type DoodleKind } from "./icons";

export type Flavour =
	| "strawberry"
	| "apricot"
	| "lemon"
	| "pistachio"
	| "blueberry"
	| "lavender";

/** Where a scattered thing sits: across in percent of its layer, down in any length. On phones it
 *  sits at `phone`, or isn't drawn when that's left out. */
export interface Placed {
	x: string;
	y: string;
	phone?: { x: string; y: string };
}

// How far each kind's motion carries it past its spot: line doodles sway a little, a sprinkle
// tumbles through a circle as wide as it is long, and a sinking sprinkle falls.
const REACH = {
	line: { x: 6, up: 8, down: 2 },
	sprinkle: { x: 10, up: 2, down: 2 },
	sinker: { x: 8, up: 26, down: 42 },
} satisfies Record<string, { x: number; up: number; down: number }>;

export type Reach = keyof typeof REACH;

/** A layer of things scattered behind a section's content, hidden until the page's clearance
 *  check has run, so none is ever seen on top of text. */
export function Scatter({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	return (
		<div
			className={cx(styles.layer, className)}
			aria-hidden="true"
			data-doodles
		>
			{children}
		</div>
	);
}

/** One scattered thing's spot in a `Scatter`, sized by `className`. */
export function Spot({
	at,
	reach,
	className,
	children,
}: {
	at: Placed;
	reach: Reach;
	className: string;
	children: ReactNode;
}) {
	return (
		<span
			className={cx(styles.spot, className)}
			style={vars({
				"--x": at.x,
				"--y": at.y,
				"--phone-x": at.phone?.x ?? at.x,
				"--phone-y": at.phone?.y ?? at.y,
			})}
			data-doodle={reach}
			data-phone={at.phone ? "" : undefined}
		>
			{children}
		</span>
	);
}

export type Scatterable =
	| (Placed & { kind: DoodleKind; flavour: Flavour })
	| (Placed & { kind: "sprinkle"; flavour: Flavour; turn: number });

/** The design system's line doodles and sprinkles, scattered behind a section. */
export function Doodles({ items }: { items: Scatterable[] }) {
	return (
		<Scatter>
			{items.map((item) =>
				item.kind === "sprinkle" ? (
					<Spot
						key={`${item.kind}-${item.x}-${item.y}`}
						at={item}
						reach="sprinkle"
						className={styles.sprinkleSpot}
					>
						<span
							className={styles.sprinkle}
							style={vars({
								"--tint": `var(--${item.flavour})`,
								"--turn": `${item.turn}deg`,
							})}
						/>
					</Spot>
				) : (
					<Spot
						key={`${item.kind}-${item.x}-${item.y}`}
						at={item}
						reach="line"
						className={styles.doodleSpot}
					>
						<Doodle
							kind={item.kind}
							className={styles.doodle}
							style={vars({ "--tint": `var(--${item.flavour}-text)` })}
						/>
					</Spot>
				),
			)}
		</Scatter>
	);
}

function obstacles(page: HTMLElement): DOMRect[] {
	const boxes: DOMRect[] = [];
	const walker = document.createTreeWalker(page, NodeFilter.SHOW_TEXT);
	for (let node = walker.nextNode(); node; node = walker.nextNode()) {
		if (
			!node.textContent?.trim() ||
			node.parentElement?.closest("[data-doodles]")
		)
			continue;
		const range = document.createRange();
		range.selectNodeContents(node);
		for (const rect of range.getClientRects())
			if (rect.width > 0) boxes.push(rect);
	}
	for (const element of page.querySelectorAll("[data-clear]"))
		boxes.push(element.getBoundingClientRect());
	return boxes;
}

/** Hides each scattered thing that would overlap text or a marked drawing (`data-clear`), once
 *  the page is laid out and again when it resizes or the web fonts reflow its text; then shows
 *  the layers. */
export function useClearance(root: RefObject<HTMLElement | null>) {
	useEffect(() => {
		const page = root.current;
		if (!page) throw new Error("the clearance check has no page");
		let frame = 0;
		const check = () => {
			const spots = [...page.querySelectorAll<HTMLElement>("[data-doodle]")];
			for (const spot of spots) delete spot.dataset.clash;
			const boxes = obstacles(page);
			for (const spot of spots) {
				const rect = spot.getBoundingClientRect();
				if (rect.width === 0) continue;
				const kind = spot.dataset.doodle;
				if (!kind || !(kind in REACH))
					throw new Error(`no reach for "${kind}"`);
				const reach = REACH[kind as Reach];
				const left = rect.left - reach.x;
				const right = rect.right + reach.x;
				const top = rect.top - reach.up;
				const bottom = rect.bottom + reach.down;
				if (
					boxes.some(
						(box) =>
							left < box.right &&
							right > box.left &&
							top < box.bottom &&
							bottom > box.top,
					)
				)
					spot.dataset.clash = "";
			}
			for (const layer of page.querySelectorAll<HTMLElement>("[data-doodles]"))
				layer.dataset.ready = "";
		};
		const schedule = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(check);
		};
		schedule();
		document.fonts.ready.then(schedule);
		window.addEventListener("resize", schedule);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("resize", schedule);
		};
	}, [root]);
}
