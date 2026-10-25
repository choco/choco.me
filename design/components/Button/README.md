A pill button that springs when you reach it: `chocolate` for the one action a view is about, outlined for the rest, and a flavour for something playful.

Use `cm-button cm-button--primary` once per view, for its main action ("Visit Nightcap"). Everything else is `cm-button--secondary`. `cm-button--flavour` fills the pill with a flavour: set `--flavour` on it (`style="--flavour: var(--pistachio)"`; `lemon` by default), and use it for light, optional things such as a sign-off or a small extra.

The consumer provides the element (`<a>` for links, `<button>` for actions) and its label in sentence case. A doodle may go before the label as an inline SVG at 20px in `currentColor`.

- Do: "Visit Nightcap", "See it on GitHub", "Say hello".
- Don't: "Click here", "Learn more", two primary buttons side by side.
