import { useRef } from "react";
import { Doodles, type Scatterable, useClearance } from "./components/Doodles";
import { Footer } from "./components/Footer";
import styles from "./NotFound.module.css";

const DOODLES: Scatterable[] = [
	{ kind: "heart", flavour: "strawberry", x: "8%", y: "18%" },
	{
		kind: "pizza",
		flavour: "apricot",
		x: "86%",
		y: "24%",
		phone: { x: "80%", y: "28px" },
	},
	{ kind: "swirl", flavour: "lavender", x: "12%", y: "72%" },
	{ kind: "sprinkle", flavour: "lemon", turn: 18, x: "90%", y: "70%" },
	{
		kind: "sprinkle",
		flavour: "blueberry",
		turn: -40,
		x: "50%",
		y: "10%",
		phone: { x: "30%", y: "24px" },
	},
];

/** The page for a path that isn't there: an empty cup, a way back to the box, and the hot cocoa. */
export function NotFound() {
	const page = useRef<HTMLDivElement>(null);
	useClearance(page);
	return (
		<div ref={page} className="relative min-h-screen overflow-x-clip">
			<main className={styles.main}>
				<Doodles items={DOODLES} />
				<div className={styles.inner}>
					<p className="label text-strawberry-text">404 · NOT IN THE BOX</p>
					<h1 className="display-xl text-ink">This cup is empty</h1>
					<p className={`lead ${styles.text}`}>
						There's nothing at this address, or someone ate it. The rest of the
						box is still there.
					</p>
					<a className={styles.back} href="/" data-clear>
						Back to the box
					</a>
				</div>
			</main>
			<Footer />
		</div>
	);
}
