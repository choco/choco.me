/** A pink marshmallow asleep in the hot cocoa, bubbles rising, beside a dashed empty seat. When
 *  the sponsor button is hovered or focused (Footer.module.css), the pink one wakes up and a
 *  vanilla one drops into the seat with a grin. */
export function Marshmallows({ className }: { className: string }) {
	return (
		<svg
			className={className}
			viewBox="-44 -70 156 124"
			role="img"
			aria-label="A pink marshmallow asleep in the hot cocoa, with a dashed empty seat beside it"
		>
			<g fill="none" stroke="var(--milk)" strokeWidth="2">
				<circle className="bubble b1" cx="10" cy="-30" r="4" />
				<circle className="bubble b2" cx="18" cy="-46" r="3" />
				<circle className="bubble b3" cx="8" cy="-60" r="2.2" />
			</g>
			<g transform="rotate(-16)">
				<g className="me">
					<path
						d="M-30 0C-31.8 12.5-31.8 25-29.5 36A29.5 10.5 0 0 0 29.5 36C31.8 25 31.8 12.5 30 0"
						fill="#ffd3de"
						stroke="var(--line-art)"
						strokeWidth="2.2"
						strokeLinejoin="round"
					/>
					<ellipse
						cx="0"
						cy="0"
						rx="30"
						ry="11"
						fill="#ffecf1"
						stroke="var(--line-art)"
						strokeWidth="2.2"
					/>
					<g transform="translate(0 3)">
						<g className="zz">
							<path
								d="M-21 25.5l1.8-3.4M-17.6 25.5l1.8-3.4M-14.2 25.5l1.8-3.4M12.4 25.5l1.8-3.4M15.8 25.5l1.8-3.4M19.2 25.5l1.8-3.4"
								fill="none"
								stroke="#f08aa3"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<path
								d="M-13 16.5q3 2.8 6 0M7 16.5q3 2.8 6 0"
								fill="none"
								stroke="var(--cocoa)"
								strokeWidth="2"
								strokeLinecap="round"
							/>
							<circle
								cx="0"
								cy="23"
								r="1.7"
								fill="none"
								stroke="var(--cocoa)"
								strokeWidth="1.6"
							/>
						</g>
						<g className="awake">
							<path
								d="M-21 25.5l1.8-3.4M-17.6 25.5l1.8-3.4M-14.2 25.5l1.8-3.4M12.4 25.5l1.8-3.4M15.8 25.5l1.8-3.4M19.2 25.5l1.8-3.4"
								fill="none"
								stroke="#f08aa3"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<circle cx="-10" cy="17" r="3" fill="var(--cocoa)" />
							<circle cx="10" cy="17" r="3" fill="var(--cocoa)" />
							<circle cx="-11.1" cy="15.9" r="1.05" fill="#ffffff" />
							<circle cx="8.9" cy="15.9" r="1.05" fill="#ffffff" />
							<path
								d="M-3.6 21.4q3.6 3.6 7.2 0"
								fill="none"
								stroke="var(--cocoa)"
								strokeWidth="1.8"
								strokeLinecap="round"
							/>
						</g>
					</g>
				</g>
			</g>
			<g transform="translate(70 12) rotate(12) scale(0.82)">
				<g className="seat">
					<path
						d="M-30 0C-31.8 12.5-31.8 25-29.5 36A29.5 10.5 0 0 0 29.5 36C31.8 25 31.8 12.5 30 0"
						fill="none"
						stroke="var(--milk)"
						strokeWidth="2.2"
						strokeDasharray="5 6"
						strokeLinecap="round"
					/>
					<ellipse
						cx="0"
						cy="0"
						rx="30"
						ry="11"
						fill="none"
						stroke="var(--milk)"
						strokeWidth="2.2"
						strokeDasharray="5 6"
						strokeLinecap="round"
					/>
				</g>
				<g className="friend">
					<path
						d="M-30 0C-31.8 12.5-31.8 25-29.5 36A29.5 10.5 0 0 0 29.5 36C31.8 25 31.8 12.5 30 0"
						fill="#fff0d6"
						stroke="var(--line-art)"
						strokeWidth="2.2"
						strokeLinejoin="round"
					/>
					<ellipse
						cx="0"
						cy="0"
						rx="30"
						ry="11"
						fill="#fffaf0"
						stroke="var(--line-art)"
						strokeWidth="2.2"
					/>
					<g transform="translate(0 3)">
						<path
							d="M-21 25.5l1.8-3.4M-17.6 25.5l1.8-3.4M-14.2 25.5l1.8-3.4M12.4 25.5l1.8-3.4M15.8 25.5l1.8-3.4M19.2 25.5l1.8-3.4"
							fill="none"
							stroke="#f3a08c"
							strokeWidth="1.5"
							strokeLinecap="round"
						/>
						<circle cx="-10" cy="17" r="3" fill="var(--cocoa)" />
						<circle cx="10" cy="17" r="3" fill="var(--cocoa)" />
						<circle cx="-11.1" cy="15.9" r="1.05" fill="#ffffff" />
						<circle cx="8.9" cy="15.9" r="1.05" fill="#ffffff" />
						<path
							d="M-4.2 20.6h8.4q0 5.2-4.2 5.2t-4.2-5.2z"
							fill="#e0607e"
							stroke="var(--cocoa)"
							strokeWidth="1.6"
							strokeLinejoin="round"
						/>
						<path
							d="M-2.4 24.4q2.4-1.6 4.8 0"
							fill="none"
							stroke="#ffb3c4"
							strokeWidth="1.4"
							strokeLinecap="round"
						/>
					</g>
				</g>
			</g>
		</svg>
	);
}
