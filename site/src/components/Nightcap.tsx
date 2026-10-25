import type { ReactNode } from "react";
import { cx } from "../lib/cx";
import { type Placed, Scatter, Spot } from "./Doodles";
import { GitHubIcon, MoonIcon } from "./icons";
import styles from "./Nightcap.module.css";
import { Scene } from "./Scene";

const MARKS: Record<"moon" | "star" | "sparkle", ReactNode> = {
	moon: <path d="M20 14.6A8.6 8.6 0 1 1 9.4 4.1a6.7 6.7 0 0 0 10.6 10.5z" />,
	star: (
		<path d="M12 3.5l2.2 5.3 5.6.5-4.3 3.7 1.3 5.5L12 15.6l-4.8 2.9 1.3-5.5L4.2 9.3l5.6-.5z" />
	),
	sparkle: <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />,
};

// Nightcap's own doodles in its band: moons, stars and sparkles, twinkling.
const STARS: (Placed & { kind: keyof typeof MARKS; gold?: boolean })[] = [
	{ kind: "moon", x: "4%", y: "14%" },
	{
		kind: "star",
		x: "5%",
		y: "86%",
		gold: true,
		phone: { x: "84%", y: "36px" },
	},
	{ kind: "sparkle", x: "47%", y: "8%" },
	{ kind: "moon", x: "93%", y: "72%", gold: true },
	{ kind: "sparkle", x: "95%", y: "16%" },
	{
		kind: "star",
		x: "55%",
		y: "90%",
		phone: { x: "46%", y: "calc(100% - 60px)" },
	},
];

/** Nightcap, the last praline, unwrapped: its own band in Nightcap's design system, framed by
 *  choco.me's scalloped edges, following the page's light or dark. */
export function Nightcap() {
	return (
		<section
			id="nightcap"
			className="nc-scope"
			aria-labelledby="nightcap-title"
		>
			<div className={styles.scallopTop} aria-hidden="true" />
			<div className={styles.band}>
				<Scatter>
					{STARS.map((star) => (
						<Spot
							key={`${star.x}-${star.y}`}
							at={star}
							reach="line"
							className={styles.starSpot}
						>
							<svg
								aria-hidden="true"
								className={cx(styles.star, star.gold && styles.gold)}
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								{MARKS[star.kind]}
							</svg>
						</Spot>
					))}
				</Scatter>
				<div className={styles.inner}>
					<div className={styles.text}>
						<p className={`label ${styles.label}`}>
							FOR MAC · FREE AND OPEN SOURCE
						</p>
						<h2 id="nightcap-title" className="display-l text-ink">
							Night Shift, made yours.
						</h2>
						<p className={`lead ${styles.lead}`}>
							Nightcap switches Night Shift off while the apps and websites you
							choose are in front, and gives it back when you leave them.
						</p>
						<div className={styles.actions}>
							<a
								className={cx(styles.button, styles.primary)}
								href="https://nightcap.choco.me"
								data-clear
							>
								<MoonIcon />
								Get Nightcap
							</a>
							<a
								className={cx(styles.button, styles.secondary)}
								href="https://github.com/choco/Nightcap"
								data-clear
							>
								<GitHubIcon />
								View on GitHub
							</a>
						</div>
						<span className="small text-ink-muted">
							macOS 15 or later, Apple silicon
						</span>
					</div>
					<div className={styles.sceneColumn}>
						<Scene />
					</div>
				</div>
			</div>
			<div className={styles.scallopBottom} aria-hidden="true" />
		</section>
	);
}
