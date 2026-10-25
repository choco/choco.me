import { useEffect, useState } from "react";
import styles from "./ThemeSwitch.module.css";

type Choice = "system" | "light" | "dark";
const KEY = "choco-theme";

/** The footer's appearance switch: match the system, or keep the page light or dark. The choice
 *  is remembered, and index.html applies it before the first paint. */
export function ThemeSwitch() {
	// The server can't know the visitor's choice, so the page hydrates as "system" and then reads it.
	const [choice, setChoice] = useState<Choice>("system");
	useEffect(() => {
		const saved = document.documentElement.dataset.theme;
		if (saved === "light" || saved === "dark") setChoice(saved);
	}, []);

	const choose = (next: Choice) => {
		setChoice(next);
		if (next === "system") delete document.documentElement.dataset.theme;
		else document.documentElement.dataset.theme = next;
		// Storage can be refused (blocked site data); the choice still holds for this visit.
		try {
			if (next === "system") localStorage.removeItem(KEY);
			else localStorage.setItem(KEY, next);
		} catch {}
	};

	return (
		<fieldset className={styles.switch} aria-label="Appearance" data-clear>
			<button
				type="button"
				aria-label="Match the system"
				aria-pressed={choice === "system"}
				onClick={() => choose("system")}
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.7"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="8" />
					<path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
				</svg>
			</button>
			<button
				type="button"
				aria-label="Light"
				aria-pressed={choice === "light"}
				onClick={() => choose("light")}
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.7"
					strokeLinecap="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="4.2" />
					<path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" />
				</svg>
			</button>
			<button
				type="button"
				aria-label="Dark"
				aria-pressed={choice === "dark"}
				onClick={() => choose("dark")}
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.7"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="M20 14.6A8.6 8.6 0 1 1 9.4 4.1a6.7 6.7 0 0 0 10.6 10.5z" />
				</svg>
			</button>
		</fieldset>
	);
}
