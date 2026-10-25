export interface Post {
	slug: string;
	title: string;
	/** As shown, such as "Oct 2026". */
	date: string;
	minutes: number;
	flavour:
		| "strawberry"
		| "apricot"
		| "lemon"
		| "pistachio"
		| "blueberry"
		| "lavender";
}

/** The writing, newest first. While it's empty, the home page shows the writing's empty state.
 *  Each post links to /writing/<slug>/, a page the site doesn't build yet: a first post needs the
 *  writing pages too. */
export const POSTS: Post[] = [];
