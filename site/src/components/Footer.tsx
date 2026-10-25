import { vars } from "../lib/vars";
import { CocoaArt } from "./CocoaArt";
import { type Flavour, type Placed, Scatter, Spot } from "./Doodles";
import styles from "./Footer.module.css";
import { Doodle } from "./icons";
import { Marshmallows } from "./Marshmallows";
import { Note } from "./Note";
import { ThemeSwitch } from "./ThemeSwitch";

// Sprinkles sinking slowly through the cocoa, in the margins; three stay on phones.
const SINKERS: (Placed & { flavour: Flavour; turn: number; delay: number })[] =
	[
		{ x: "4%", y: "20%", flavour: "lemon", turn: 30, delay: 0 },
		{ x: "10%", y: "62%", flavour: "lavender", turn: -50, delay: -3 },
		{
			x: "15%",
			y: "86%",
			flavour: "pistachio",
			turn: 70,
			delay: -6,
			phone: { x: "9%", y: "57%" },
		},
		{ x: "66%", y: "14%", flavour: "strawberry", turn: -20, delay: -9 },
		{
			x: "74%",
			y: "68%",
			flavour: "blueberry",
			turn: 45,
			delay: -2,
			phone: { x: "84%", y: "60%" },
		},
		{
			x: "83%",
			y: "34%",
			flavour: "apricot",
			turn: -65,
			delay: -5,
			phone: { x: "86%", y: "36%" },
		},
		{ x: "90%", y: "80%", flavour: "strawberry", turn: 15, delay: -8 },
		{ x: "96%", y: "22%", flavour: "lemon", turn: -35, delay: -11 },
	];

/** The hot cocoa at the bottom of every page: the next praline still cooling, an invitation to
 *  sponsor with marshmallows saving a seat, and the copyright, the appearance switch and the
 *  sign-off. */
export function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.surface}>
				<CocoaArt className={styles.art} />
				<Note
					flavour="strawberry"
					arrow="rotate(95deg)"
					className={styles.note}
				>
					hot cocoa, careful
				</Note>
			</div>
			<div className={styles.cocoa}>
				<Scatter>
					{SINKERS.map((sinker) => (
						<Spot
							key={`${sinker.x}-${sinker.y}`}
							at={sinker}
							reach="sinker"
							className={styles.sinkerSpot}
						>
							<span
								className={styles.sinker}
								style={{
									...vars({
										"--tint": `var(--${sinker.flavour})`,
										"--turn": `${sinker.turn}deg`,
									}),
									animationDelay: `${sinker.delay}s`,
								}}
							/>
						</Spot>
					))}
				</Scatter>
				<div className={styles.inner}>
					<div className={styles.sponsor}>
						<div className={styles.sponsorText}>
							<p className={styles.sign}>The next praline is still cooling.</p>
							<p className={`body ${styles.copy}`}>
								If you enjoy my apps and articles, any support is much
								appreciated.
							</p>
							<a
								className={styles.cta}
								href="https://github.com/sponsors/choco"
								data-clear
							>
								<Doodle kind="heart" />
								Sponsor on GitHub
							</a>
						</div>
						<Marshmallows className={styles.marshmallows} />
					</div>
					<div className={styles.meta}>
						<span className="small text-lavender">
							© 2026 Enrico Ghirardi<span className={styles.metaDot}> · </span>
							<span className={styles.made}>
								made with{" "}
								<Doodle
									kind="chocolate"
									className={`${styles.madeIcon} ${styles.chocolate}`}
									role="img"
									aria-hidden={undefined}
									aria-label="chocolate"
								/>{" "}
								and{" "}
								<Doodle
									kind="heart"
									className={`${styles.madeIcon} ${styles.love}`}
									role="img"
									aria-hidden={undefined}
									aria-label="love"
								/>
							</span>
						</span>
						<ThemeSwitch />
					</div>
					<p className={styles.cowboy}>see you, space cowboy...</p>
				</div>
			</div>
		</footer>
	);
}
