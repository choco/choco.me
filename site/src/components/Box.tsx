import styles from "./Box.module.css";

/** The box of pralines with one left: Nightcap, glowing in its cup and flying its flag, links to
 *  its section; the other cups hold what's left of the rest. */
export function Box() {
	return (
		<div className={styles.box} data-clear>
			<div className="cm-box__cup cup-filled">
				<a className="pick nc-scope" href="#nightcap">
					<span className="sr-only">
						Nightcap, the last praline: jump to it
					</span>
					<svg
						className="cup-art"
						viewBox="0 0 100 100"
						style={{ overflow: "visible" }}
						aria-hidden="true"
					>
						<g className="flag">
							<path
								d="M70 30 78.7 -22"
								stroke="var(--line-art)"
								strokeWidth="3.1"
								strokeLinecap="round"
							/>
							<path
								d="M70 30 78.7 -22"
								stroke="#ffd5b0"
								strokeWidth="1.8"
								strokeLinecap="round"
							/>
							<g transform="translate(79.4 -20.4) rotate(9.46)">
								<path
									d="M0 0h68l-7 7 7 7H0z"
									fill="#fffaf7"
									stroke="var(--line-art)"
									strokeWidth="1.7"
									strokeLinejoin="round"
								/>
								<text
									x="5"
									y="10.4"
									style={{
										font: "400 10.5px var(--family-display)",
										fill: "#0b1330",
									}}
								>
									Nightcap
								</text>
							</g>
						</g>
						<ellipse
							className="shadow"
							cx="50"
							cy="84"
							rx="30"
							ry="5"
							fill="var(--cocoa)"
						/>
						<g className="pr">
							<path
								d="M28 20c6-2 10 2 16 0s10 1 16 0 10 1 13 4c4 5 1 9 3 14s-1 10 1 15-2 9-1 14c-2 6-8 7-12 10s-10-1-16 1-10-1-16 0-9-2-13-7-1-9-3-14 1-10-1-15 1-9 3-13 6-6 11-7z"
								fill="var(--night)"
								stroke="var(--line-art)"
								strokeWidth="2.2"
								strokeLinejoin="round"
							/>
							<path
								d="M22 40c8 2 13-3 20 0M80 60c-8-2-12 4-19 1"
								fill="none"
								stroke="#34467a"
								strokeWidth="2.2"
								strokeLinecap="round"
							/>
							<path
								d="M56 34a15 15 0 1 0 11 23 12 12 0 1 1-11-23z"
								fill="var(--moon)"
							/>
							<path
								d="M27 29q6-6 15-6"
								fill="none"
								stroke="#ffffff"
								strokeWidth="3"
								strokeLinecap="round"
								opacity="0.5"
							/>
							<circle cx="70" cy="34" r="1.8" fill="var(--moon)" />
							<circle cx="33" cy="70" r="1.5" fill="var(--moon)" />
						</g>
					</svg>
				</a>
			</div>
			<div className="cm-box__cup">
				<div className="cm-box__crumbs">
					<svg className="cup-art" viewBox="0 0 100 100" aria-hidden="true">
						<path
							d="M22 47 36 26 52 34 70 22 82 42 76 66 56 77 34 72Z"
							fill="var(--lavender)"
							stroke="var(--line-art)"
							strokeWidth="1.9"
							strokeLinejoin="round"
						/>
						<path
							d="M36 26 46 50 34 72M52 34 56 54 76 66M70 22 56 54 46 50 22 47"
							fill="none"
							stroke="var(--line-art)"
							strokeWidth="1.2"
							strokeLinejoin="round"
							opacity="0.4"
						/>
						<path d="M52 37 56 50 66 29Z" fill="#ffffff" opacity="0.55" />
					</svg>
				</div>
			</div>
			<div className="cm-box__cup">
				<div className="cm-box__crumbs">
					<svg className="cup-art" viewBox="0 0 100 100" aria-hidden="true">
						<g fill="var(--ink-muted)">
							<path d="M34 40l6-3 4 4-2 6-7 1z" />
							<path d="M58 58l5-4 6 2-1 6-6 1z" />
							<circle cx="66" cy="38" r="2.4" />
							<circle cx="44" cy="64" r="2" />
							<circle cx="28" cy="58" r="1.6" />
							<circle cx="52" cy="30" r="1.5" />
							<circle cx="74" cy="66" r="1.7" />
						</g>
					</svg>
				</div>
			</div>
			<div className="cm-box__cup">
				<div className="cm-box__crumbs">
					<svg className="cup-art" viewBox="0 0 100 100" aria-hidden="true">
						<defs>
							<clipPath id="dome-cup">
								<circle cx="48" cy="52" r="24" />
							</clipPath>
						</defs>
						<ellipse
							cx="48"
							cy="80"
							rx="24"
							ry="4.5"
							fill="var(--cocoa)"
							opacity="0.14"
						/>
						<circle
							cx="48"
							cy="52"
							r="24"
							fill="var(--cocoa)"
							stroke="var(--line-art)"
							strokeWidth="2.2"
						/>
						<path
							d="M30 52l14-16M34 64l22-26M44 72l20-22"
							fill="none"
							stroke="var(--strawberry)"
							strokeWidth="2.6"
							strokeLinecap="round"
							clipPath="url(#dome-cup)"
						/>
						<g clipPath="url(#dome-cup)">
							<circle
								cx="70"
								cy="36"
								r="11"
								fill="var(--box)"
								stroke="var(--strawberry)"
								strokeWidth="7"
							/>
							<circle
								cx="75"
								cy="52"
								r="9"
								fill="var(--box)"
								stroke="var(--strawberry)"
								strokeWidth="7"
							/>
						</g>
						<path
							d="M32 62a18 18 0 0 0 10 8"
							fill="none"
							stroke="#ffffff"
							strokeWidth="2.6"
							strokeLinecap="round"
							opacity="0.35"
						/>
						<g fill="var(--ink-muted)">
							<circle cx="80" cy="34" r="1.8" />
							<circle cx="84" cy="44" r="1.4" />
						</g>
					</svg>
				</div>
			</div>
			<div className="cm-box__cup">
				<div className="cm-box__crumbs">
					<svg className="cup-art" viewBox="0 0 100 100" aria-hidden="true">
						<path
							d="M26 31 73 25 78 63 62 78 30 74Z"
							fill="var(--apricot)"
							stroke="var(--line-art)"
							strokeWidth="1.9"
							strokeLinejoin="round"
						/>
						<path
							d="M78 63 62 78 65 61Z"
							fill="#ffffff"
							fillOpacity="0.55"
							stroke="var(--line-art)"
							strokeWidth="1.6"
							strokeLinejoin="round"
						/>
						<path
							d="M28 34 64 70"
							stroke="var(--line-art)"
							strokeWidth="1.2"
							opacity="0.3"
						/>
						<path
							d="M34 36 50 34"
							stroke="#ffffff"
							strokeWidth="2.6"
							strokeLinecap="round"
							opacity="0.55"
						/>
					</svg>
				</div>
			</div>
			<div className="cm-box__cup">
				<div className="cm-box__crumbs">
					<svg className="cup-art" viewBox="0 0 100 100" aria-hidden="true">
						<rect
							x="34"
							y="34"
							width="6"
							height="18"
							rx="3"
							fill="var(--strawberry)"
							stroke="var(--line-art)"
							strokeWidth="1.3"
							transform="rotate(38 37 43)"
						/>
						<rect
							x="56"
							y="48"
							width="6"
							height="18"
							rx="3"
							fill="var(--lemon)"
							stroke="var(--line-art)"
							strokeWidth="1.3"
							transform="rotate(-24 59 57)"
						/>
						<rect
							x="42"
							y="60"
							width="6"
							height="18"
							rx="3"
							fill="var(--blueberry)"
							stroke="var(--line-art)"
							strokeWidth="1.3"
							transform="rotate(78 45 69)"
						/>
						<circle cx="66" cy="34" r="1.8" fill="var(--ink-muted)" />
					</svg>
				</div>
			</div>
		</div>
	);
}
