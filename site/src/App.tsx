import { useRef } from "react";
import { useClearance } from "./components/Doodles";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nightcap } from "./components/Nightcap";
import { Writing } from "./components/Writing";

/** The page: the hello and the box, Nightcap in its own band, the writing, and the hot cocoa. */
export function App() {
	const page = useRef<HTMLDivElement>(null);
	useClearance(page);
	return (
		<div ref={page} className="relative min-h-screen overflow-x-clip">
			<main>
				<Hero />
				<Nightcap />
				<Writing />
			</main>
			<Footer />
		</div>
	);
}
