import type { ReactNode } from "react";
import { NOTES } from "../data/notes";
import { POSTS } from "../data/posts";
import { vars } from "../lib/vars";
import { Box } from "./Box";
import { Doodles, type Flavour, type Scatterable } from "./Doodles";
import styles from "./Hero.module.css";
import {
	BlueskyIcon,
	GitHubIcon,
	LinkedInIcon,
	MailIcon,
	MastodonIcon,
} from "./icons";
import { Mascot } from "./Mascot";
import { Note } from "./Note";

const DOODLES: Scatterable[] = [
	{ kind: "heart", flavour: "strawberry", x: "4%", y: "12%" },
	{ kind: "swirl", flavour: "blueberry", x: "6%", y: "76%" },
	{ kind: "daisy", flavour: "pistachio", x: "48%", y: "6%" },
	{
		kind: "squiggle",
		flavour: "lavender",
		x: "93%",
		y: "14%",
		phone: { x: "80%", y: "30px" },
	},
	{
		kind: "pizza",
		flavour: "apricot",
		x: "12%",
		y: "52%",
		phone: { x: "78%", y: "150px" },
	},
	{ kind: "sprinkle", flavour: "lemon", turn: -40, x: "2%", y: "44%" },
	{
		kind: "sprinkle",
		flavour: "lavender",
		turn: 18,
		x: "16%",
		y: "6%",
		phone: { x: "56%", y: "26px" },
	},
	{
		kind: "sprinkle",
		flavour: "strawberry",
		turn: 62,
		x: "64%",
		y: "90%",
		phone: { x: "62%", y: "calc(100% - 50px)" },
	},
	{ kind: "sprinkle", flavour: "blueberry", turn: -40, x: "95%", y: "84%" },
];

const SOCIALS: {
	label: string;
	href: string;
	flavour: Flavour;
	icon: ReactNode;
	me?: boolean;
}[] = [
	{
		label: "Email hello@choco.me",
		href: "mailto:hello@choco.me",
		flavour: "apricot",
		icon: <MailIcon />,
	},
	{
		label: "Bluesky",
		href: "https://bsky.app/profile/chocobuono.bsky.social",
		flavour: "blueberry",
		icon: <BlueskyIcon />,
	},
	{
		label: "Mastodon",
		href: "https://mastodon.social/@chocobuono",
		flavour: "lavender",
		icon: <MastodonIcon />,
		me: true,
	},
	{
		label: "GitHub",
		href: "https://github.com/choco",
		flavour: "pistachio",
		icon: <GitHubIcon />,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/enrico-ghirardi/",
		flavour: "lemon",
		icon: <LinkedInIcon className={styles.linkedin} />,
	},
];

/** The hello: Enrico's introduction and links, beside the box of pralines with one left, the
 *  chocolate bar who ate the rest, and the recipe card that leads to the writing. */
export function Hero() {
	return (
		<>
			<section className={styles.hero}>
				<Doodles items={DOODLES} />
				<div className={styles.inner}>
					<div className={styles.text}>
						<p className="label text-strawberry-text">
							MADE IN ITALY · LIVING IN ZURICH
						</p>
						<h1 className="display-xl text-ink">
							Hi, I'm <span className={styles.name}>Enrico</span>
						</h1>
						<p className={`lead ${styles.intro}`}>
							Software engineer who loves UI design and illustration, and
							breaking into things. I cook, and I never say no to pizza or
							chocolate.
						</p>
						<nav className={styles.socials} aria-label="Elsewhere" data-clear>
							{SOCIALS.map((social) => (
								<a
									key={social.label}
									className={styles.social}
									style={vars({ "--flavour": `var(--${social.flavour})` })}
									href={social.href}
									rel={social.me ? "me" : undefined}
									aria-label={social.label}
								>
									{social.icon}
								</a>
							))}
						</nav>
					</div>

					<div className={styles.boxColumn}>
						<Note
							flavour="pistachio"
							arrow="rotate(188deg)"
							arrowFirst
							className={styles.tryNote}
							lines={NOTES.tryOne}
						/>
						<a className={styles.tucked} href="#writing" data-clear>
							<span className={styles.tuckedBody}>
								<span className={styles.tuckedTitle}>Writing</span>
								<span className={styles.tuckedMeta}>
									{POSTS.length === 0
										? "first one soon"
										: `${POSTS.length} ${POSTS.length === 1 ? "recipe" : "recipes"} inside`}
								</span>
							</span>
							<span className={styles.tuckedTop} aria-hidden="true" />
						</a>
						<Box />
						<Mascot />
						<Note
							flavour="strawberry"
							arrow="rotate(30deg)"
							className={styles.caption}
							lines={NOTES.wasntMe}
						/>
					</div>
				</div>
			</section>
			<div className={styles.handoff}>
				<Note
					flavour="lavender"
					arrow="scaleX(-1) rotate(110deg)"
					arrowFirst
					className={styles.unwrapped}
					lines={NOTES.unwrapped}
				/>
			</div>
		</>
	);
}
