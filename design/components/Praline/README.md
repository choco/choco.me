A plain praline tile: a square wrapped in a flavour's foil, which lifts when you reach it and peels back from its bottom-right corner to show the chocolate inside, and an arrow on it.

Set the flavour on the element: `style="--flavour: var(--blueberry)"` (strawberry by default). Words and marks on the foil are `on-flavour`, in both themes. `cm-praline--dark` is the dark praline, cocoa foil with a pastel filling (`--filling`, `lavender` by default): Nightcap's, and only one per box. `is-peeled` holds the peel open, for a still picture of it.

The consumer provides an `<a>` holding, in order:

- `cm-praline__inside`: the curly arrow, as an inline SVG with `aria-hidden="true"`. The peel shows it, so it never holds anything the reader needs.
- `cm-praline__foil`: `cm-praline__mark` (a doodle, or a project's own icon as an `<img>`), `cm-praline__name` in `title`, and `cm-praline__line`, one short sentence.
- `cm-praline__flap`, empty: the foil's folded corner.

The words sit at the top of the foil. Keep the name to a word or two and the line under about 40 characters, so they stay clear of the folded corner. Pralines sit in a `Box`; outside one they keep their `shadow-sit`.

- Do: "Nightcap" / "Night Shift, made yours."
- Don't: a paragraph on the foil, a button inside a praline, two dark pralines.

The box of one draws its contents instead (`Box`); use this tile for a box of flat tiles.
