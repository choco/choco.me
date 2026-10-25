The scatter of doodles and sprinkles behind a section: line doodles from the `Doodles` set swaying slowly, and sprinkles turning as they drift.

Put `cm-doodles` (with `aria-hidden="true"`) as the first child of a positioned section, and fill it with `cm-doodle` SVGs and `cm-sprinkle` spans, each placed with `left` and `top` in percent. Colour a doodle with `--tint` set to a flavour's `-text` token (it is drawn at 50% opacity), and a sprinkle with `--tint` set to the flavour itself; turn a sprinkle with `--turn`.

Scatter them densest around the hello, sparse through the middle: about twenty around a hero on a wide screen, one in three of them on phones, and a handful around a quieter section (the writing has a swirl, the chocolate bar and three sprinkles; two on phones). Mix four or more flavours, never two of the same next to each other.

A doodle never touches text or a drawing (a praline, the mascot, a card, a button), at any width. Percent positions drift as the layout narrows, so check every width from phone to wide screen and hide a doodle at the widths where it would collide rather than let it overlap. On the site, place them with a clearance check around the marked content (as Nightcap's site does with `data-doodle-clear`).

The consumer provides the section, the placement of each piece, and the doodles as inline SVGs in `currentColor` (the SVG files are drawn in `cocoa`).
