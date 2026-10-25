import { useEffect, useRef } from "react";
import styles from "./Mascot.module.css";

const VIEW_BOX = "-12 30 164 176";

/** The chocolate bar in its salmon wrapper, leaning on the box's corner: it blinks, waves, and
 *  its eyes follow the pointer. The waving arm and the eyes are each an <svg> of their own, over
 *  the bar's and with its viewBox: WebKit moves an <svg> on its compositor, but an element inside
 *  one on its main thread, restyling the whole page with it every frame. */
export function Mascot() {
	const bar = useRef<HTMLDivElement>(null);
	const eyes = useRef<SVGSVGElement>(null);
	useEffect(() => {
		if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let frame = 0;
		const look = (event: PointerEvent) => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				if (!bar.current || !eyes.current)
					throw new Error("the mascot has no eyes");
				const box = bar.current.getBoundingClientRect();
				const dx = event.clientX - (box.left + box.width / 2);
				const dy = event.clientY - (box.top + box.height * 0.58);
				const distance = Math.hypot(dx, dy) || 1;
				// Up to 3.4 of the viewBox's units.
				const reach = (Math.min(1, distance / 260) * 3.4 * box.width) / 164;
				eyes.current.style.translate = `${((dx / distance) * reach).toFixed(1)}px ${((dy / distance) * reach).toFixed(1)}px`;
			});
		};
		window.addEventListener("pointermove", look, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("pointermove", look);
		};
	}, []);

	return (
		<div
			ref={bar}
			className={styles.mascot}
			data-clear
			role="img"
			aria-label="A chocolate bar with a bite out of it, in a pastel wrapper with a band, waving"
		>
			<svg viewBox={VIEW_BOX} aria-hidden="true">
				<ellipse
					cx="70"
					cy="198"
					rx="56"
					ry="7"
					fill="var(--apricot)"
					opacity="0.8"
				/>
			</svg>
			<div className={styles.tilt}>
				<svg className={styles.wave} viewBox={VIEW_BOX} aria-hidden="true">
					<path
						d="M120 138c10-4 15-13 14-24"
						fill="none"
						stroke="var(--line-art)"
						strokeWidth="3.1"
						strokeLinecap="round"
					/>
					<circle
						cx="134"
						cy="112"
						r="6"
						fill="var(--wrap)"
						stroke="var(--line-art)"
						strokeWidth="2.8"
					/>
				</svg>
				<svg viewBox={VIEW_BOX} aria-hidden="true">
					<defs>
						<mask id="bite-hero">
							<rect x="-20" width="190" height="220" fill="#ffffff" />
							<circle cx="104" cy="50" r="13" fill="#000000" />
							<circle cx="114" cy="64" r="12" fill="#000000" />
							<circle cx="92" cy="44" r="9" fill="#000000" />
							<circle cx="119" cy="46" r="8" fill="#000000" />
						</mask>
					</defs>
					<path
						d="M20 140c-10 4-14 12-14 22"
						fill="none"
						stroke="var(--line-art)"
						strokeWidth="3.1"
						strokeLinecap="round"
					/>
					<circle
						cx="6"
						cy="164"
						r="6"
						fill="var(--wrap)"
						stroke="var(--line-art)"
						strokeWidth="2.8"
					/>
					<g mask="url(#bite-hero)">
						<rect
							x="24"
							y="44"
							width="92"
							height="70"
							rx="10"
							fill="#6b4032"
							stroke="#4a2c24"
							strokeWidth="2.8"
						/>
						<rect
							x="28"
							y="48"
							width="25.3"
							height="22"
							rx="3"
							fill="#7f4e3e"
						/>
						<path
							d="M31 67V51H50.3"
							fill="none"
							stroke="#ffffff"
							strokeOpacity="0.22"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<rect
							x="57.3"
							y="48"
							width="25.3"
							height="22"
							rx="3"
							fill="#7f4e3e"
						/>
						<path
							d="M60.3 67V51H79.7"
							fill="none"
							stroke="#ffffff"
							strokeOpacity="0.22"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<rect
							x="86.7"
							y="48"
							width="25.3"
							height="22"
							rx="3"
							fill="#7f4e3e"
						/>
						<path
							d="M89.7 67V51H109"
							fill="none"
							stroke="#ffffff"
							strokeOpacity="0.22"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<rect
							x="28"
							y="74"
							width="25.3"
							height="22"
							rx="3"
							fill="#7f4e3e"
						/>
						<path
							d="M31 93V77H50.3"
							fill="none"
							stroke="#ffffff"
							strokeOpacity="0.22"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<rect
							x="57.3"
							y="74"
							width="25.3"
							height="22"
							rx="3"
							fill="#7f4e3e"
						/>
						<path
							d="M60.3 93V77H79.7"
							fill="none"
							stroke="#ffffff"
							strokeOpacity="0.22"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<rect
							x="86.7"
							y="74"
							width="25.3"
							height="22"
							rx="3"
							fill="#7f4e3e"
						/>
						<path
							d="M89.7 93V77H109"
							fill="none"
							stroke="#ffffff"
							strokeOpacity="0.22"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</g>
					<path
						d="M18 114L18 86L24 84L30 90L36 87L41 92L47 90L52 96L58 93L64 99L70 96L76 101L82 97L88 100L94 95L99 97L104 90L109 89L113 83L118 85L122 79V114Z"
						fill="#f2efed"
						stroke="var(--line-art)"
						strokeWidth="2.5"
						strokeLinejoin="round"
					/>
					<path
						d="M22.5 100v7"
						fill="none"
						stroke="#ffffff"
						strokeWidth="3"
						strokeLinecap="round"
						opacity="0.9"
					/>
					<path
						d="M41 93l2 12M64 100l-1 10M94 97l2 12M113 86l-1 18"
						fill="none"
						stroke="#d9cfca"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M18 86L24 84L30 90L23 96.5L15 99L10 97.5L5.5 98.5L4 94.5L6.5 91.5L3.5 88L6.5 84L11.5 82.5Z"
						fill="#e2d8d3"
						stroke="var(--line-art)"
						strokeWidth="2.2"
						strokeLinejoin="round"
					/>
					<path
						d="M23.5 89.5L10 93"
						stroke="#d9cfca"
						strokeWidth="1.8"
						strokeLinecap="round"
					/>
					<path
						d="M18 112H122V174a20 20 0 0 1-20 20H38a20 20 0 0 1-20-20Z"
						fill="var(--wrap)"
						stroke="var(--line-art)"
						strokeWidth="3.1"
						strokeLinejoin="round"
					/>
					<rect
						x="18"
						y="162"
						width="104"
						height="13"
						fill="var(--band)"
						stroke="var(--line-art)"
						strokeWidth="2.2"
					/>
					<path
						d="M30 126v30"
						stroke="#ffffff"
						strokeWidth="6"
						strokeLinecap="round"
						opacity="0.45"
					/>
					<ellipse className="blush" cx="40" cy="150" rx="9" ry="5" />
					<ellipse className="blush" cx="100" cy="150" rx="9" ry="5" />
					<path
						d="M64 147q6 7 12 0z"
						fill="var(--cocoa)"
						stroke="var(--line-art)"
						strokeWidth="2.5"
						strokeLinejoin="round"
					/>
					<path d="M67 151q3 2.5 6 0" fill="var(--strawberry)" />
				</svg>
				<svg
					ref={eyes}
					className={styles.eyes}
					viewBox={VIEW_BOX}
					aria-hidden="true"
				>
					<circle cx="55" cy="136" r="7.5" fill="var(--cocoa)" />
					<circle cx="52.4" cy="133.2" r="2.8" fill="#ffffff" />
					<circle cx="57.4" cy="138.6" r="1.2" fill="#ffffff" />
					<circle cx="85" cy="136" r="7.5" fill="var(--cocoa)" />
					<circle cx="82.4" cy="133.2" r="2.8" fill="#ffffff" />
					<circle cx="87.4" cy="138.6" r="1.2" fill="#ffffff" />
				</svg>
			</div>
		</div>
	);
}
