import styles from "./Scene.module.css";

const Moon = () => (
	<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
		<path
			d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
			strokeWidth="2"
			strokeLinejoin="round"
		/>
		<path
			d="M15.5 2.5h4l-4 4.5h4"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const Chevron = () => (
	<svg
		aria-hidden="true"
		viewBox="0 0 8 14"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.7"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M2 2l4.5 5L2 12" />
	</svg>
);

/** Nightcap in the Mac menu bar with its menu open over Figma, as Nightcap's site draws it: the
 *  wallpaper, the translucent bar with the Apple menu and Figma's menus, the pressed moon before
 *  the clock, and Figma's window behind the menu. */
export function Scene() {
	return (
		<div className={styles.screen} aria-hidden="true" data-clear>
			<div className={styles.bar}>
				<svg aria-hidden="true" className={styles.apple} viewBox="0 0 14 17">
					<path
						d="M11.6 9c0-2 1.6-2.9 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7C3.4 4.4 2 5.3 1.3 6.7c-1.4 2.5-.4 6.1 1 8.1.7 1 1.5 2 2.5 2 1 0 1.4-.6 2.6-.6 1.2 0 1.5.6 2.6.6 1.1 0 1.8-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.3 0 0-2.1-.8-2.1-3.3zM9.7 3c.5-.7.9-1.6.8-2.5-.8 0-1.8.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.8-.4 2.3-1.1z"
						fill="currentColor"
					/>
				</svg>
				<span className={styles.app}>Figma</span>
				<span className={styles.menus}>
					<span>File</span>
					<span>Edit</span>
					<span>View</span>
				</span>
				<span className={styles.spacer} />
				<span className={styles.moon}>
					<Moon />
				</span>
				<span>Fri 23:41</span>
			</div>
			<div className={styles.window}>
				<div className={styles.titlebar}>
					<span className={styles.lights}>
						<i className={styles.close} />
						<i className={styles.minimise} />
						<i className={styles.zoom} />
					</span>
					Poster v3
				</div>
				<div className={styles.canvas}>
					<div className={styles.poster}>
						<i className={styles.circle} />
						<i className={styles.square} />
						<i className={styles.stripe} />
					</div>
				</div>
			</div>
			<div className={styles.menuSpot}>
				<div className={styles.menu}>
					<div className={styles.item}>
						<span className={styles.check}>✓</span>
						<span className={styles.image}>
							<Moon />
						</span>
						<span>
							<span className={styles.title}>Night Shift</span>
							<span className={styles.subtitle}>
								{"Off in Figma:\nyour config’s rule"}
							</span>
						</span>
						<span className={styles.key}>⌃⌥⌘N</span>
					</div>
					<div className={styles.slider}>
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							width="9"
							height="9"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.4"
							strokeLinecap="round"
						>
							<circle cx="12" cy="12" r="4" />
							<path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
						</svg>
						<span className={styles.track}>
							<span />
						</span>
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							width="13"
							height="13"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						>
							<circle cx="12" cy="12" r="4.2" />
							<path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
						</svg>
					</div>
					<div className={styles.item}>
						<span className={styles.check} />
						<span className={styles.image}>
							<svg
								aria-hidden="true"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="13.5" r="7.5" />
								<path d="M12 10v3.5l2.3 2.3M9.5 2.5h5" />
							</svg>
						</span>
						<span className={styles.title}>Turn Off</span>
						<span className={styles.key}>
							<Chevron />
						</span>
					</div>
					<div className={styles.separator} />
					<div className={`${styles.item} ${styles.current}`}>
						<span className={styles.check} />
						<span className={styles.image}>
							<span className={styles.tile}>F</span>
						</span>
						<span>
							<span className={styles.title}>Turn On in Figma</span>
							<span className={styles.subtitle}>
								{"Always off: your\nconfig’s rule"}
							</span>
						</span>
						<span className={styles.key}>
							<Chevron />
						</span>
					</div>
					<div className={styles.separator} />
					<div className={styles.item}>
						<span className={styles.check} />
						<span className={styles.image}>
							<svg
								aria-hidden="true"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="3" />
								<path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" />
								<circle cx="12" cy="12" r="6.2" />
							</svg>
						</span>
						<span className={styles.title}>Settings…</span>
						<span className={styles.key}>⌘,</span>
					</div>
					<div className={styles.item}>
						<span className={styles.check} />
						<span className={styles.image}>
							<svg
								aria-hidden="true"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 3v8M6.3 6.8a8 8 0 1 0 11.4 0" />
							</svg>
						</span>
						<span className={styles.title}>Quit Nightcap</span>
						<span className={styles.key}>⌘Q</span>
					</div>
				</div>
			</div>
		</div>
	);
}
