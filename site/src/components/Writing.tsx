import { POSTS, type Post } from "../data/posts";
import { cx } from "../lib/cx";
import { vars } from "../lib/vars";
import { Doodles, type Flavour, type Scatterable } from "./Doodles";
import styles from "./Writing.module.css";

const DOODLES: Scatterable[] = [
	{
		kind: "pizza",
		flavour: "strawberry",
		x: "88%",
		y: "22%",
		phone: { x: "82%", y: "20px" },
	},
	{ kind: "swirl", flavour: "lavender", x: "7%", y: "26%" },
	{ kind: "chocolate", flavour: "apricot", x: "90%", y: "84%" },
	{ kind: "sprinkle", flavour: "lemon", turn: 18, x: "12%", y: "74%" },
	{ kind: "sprinkle", flavour: "blueberry", turn: 62, x: "94%", y: "60%" },
	{
		kind: "sprinkle",
		flavour: "strawberry",
		turn: -40,
		x: "47%",
		y: "8%",
		phone: { x: "24%", y: "34px" },
	},
];

const flavour = (name: Flavour) => vars({ "--flavour": `var(--${name})` });

/** From the kitchen: the writing, newest first, or while there's none yet, a notebook page with
 *  the first recipe being written and blank recipe cards waiting on it. */
export function Writing() {
	const empty = POSTS.length === 0;
	return (
		<section
			id="writing"
			className={styles.section}
			aria-labelledby="writing-title"
		>
			<Doodles items={DOODLES} />
			<div className={styles.inner}>
				<div className={styles.head}>
					<p className="label text-lavender-text">FROM THE KITCHEN</p>
					<h2 id="writing-title" className="display-l">
						{empty ? "Things I'll write down" : "Things I wrote down"}
					</h2>
				</div>
				{empty ? <Notebook /> : <List posts={POSTS} />}
			</div>
		</section>
	);
}

function List({ posts }: { posts: Post[] }) {
	return (
		<ul className={styles.list}>
			{posts.map((post) => (
				<li key={post.slug}>
					<a href={`/writing/${post.slug}/`}>
						<span
							className={styles.dot}
							style={flavour(post.flavour)}
							aria-hidden="true"
						/>
						<span className={styles.date}>{post.date}</span>
						<span className={styles.title}>{post.title}</span>
						<span className={styles.read}>{post.minutes} min</span>
					</a>
				</li>
			))}
		</ul>
	);
}

const Pencil = ({ className }: { className: string }) => (
	<svg className={className} viewBox="-2 -2 136 32" aria-hidden="true">
		<g stroke="var(--line-art)" strokeWidth="3" strokeLinejoin="round">
			<path
				d="M116 4h7a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6h-7z"
				fill="var(--strawberry)"
			/>
			<path d="M105 4h11v20h-11z" fill="var(--lavender)" />
			<path d="M31 4h74v20H31z" fill="var(--lemon)" />
			<path d="M31 4 3 14l28 10z" fill="#ffe6cf" />
		</g>
		<path d="M11 11.1 3 14l8 2.9z" fill="var(--cocoa)" />
	</svg>
);

const Blank = ({
	className,
	tint,
	hand,
}: {
	className: string;
	tint: Flavour;
	hand?: string;
}) => (
	<span className={cx(styles.blank, className)} style={flavour(tint)}>
		<span className={styles.top} />
		{hand && <span className={styles.cardHand}>{hand}</span>}
		<span className={styles.lines}>
			<i />
			<i />
			<i />
		</span>
	</span>
);

function Notebook() {
	return (
		<div className={styles.notebook}>
			<div className={styles.row}>
				<span
					className={styles.dot}
					style={flavour("lemon")}
					aria-hidden="true"
				/>
				<span className={styles.soon}>soon</span>
				<span className={styles.handLine}>
					<span>testing the first recipe…</span>
					<Pencil className={styles.pencil} />
				</span>
			</div>
			<div className={cx(styles.row, styles.second)} aria-hidden="true">
				<span className={styles.dot} style={flavour("blueberry")} />
			</div>
			<div className={cx(styles.row, styles.third)} aria-hidden="true">
				<span className={styles.dot} style={flavour("lavender")} />
			</div>
			<div className={styles.stack} aria-hidden="true" data-clear>
				<Blank className={styles.back} tint="lavender" />
				<Blank className={styles.middle} tint="blueberry" />
				<Blank className={styles.front} tint="lemon" hand="Recipe no. 1" />
			</div>
			<p className={styles.follow}>
				I'll share it on{" "}
				<a href="https://bsky.app/profile/chocobuono.bsky.social">Bluesky</a>{" "}
				and{" "}
				<a href="https://mastodon.social/@chocobuono" rel="me">
					Mastodon
				</a>{" "}
				when it's ready.
			</p>
		</div>
	);
}
