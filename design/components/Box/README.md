The box of one: a `box` tray of pleated paper cups, three across and two down, with only the product's praline left in it and the others already eaten.

The first cup holds the product's praline: wrapped in that product's foil (Nightcap's navy with its gold moon), with a small flag on a toothpick naming it, slightly tilted. It is a link to the product's section; on hover or focus it lifts and tilts and the flag wiggles (`cm-pick`), while its shadow (`.shadow`, drawn outside the praline's `.pr` group) stays on the cup's floor and spreads and fades. Its cup glows, since it's the one still there (`cm-box__cup--filled`): a 3px gold ring and a soft halo that dims to 45% and back every 3.6s, and warm light behind the praline; at night the ring is an old gold. `cm-box__cup--gold` is the quieter alternative, a gold paper cup without the glow. The other cups hold what is left of the rest, drawn in the mascot's hand: a crumpled wrapper, a bitten praline showing its filling, crumbs, a folded wrapper, a few sprinkles. Wrap each drawing in a `cm-box__crumbs`, and give the cup by the mascot the least to see.

When a second product ships, its praline takes the next cup and a left-over goes.

Each drawing is a 100 × 100 inline SVG with `cm-cup-art`, drawn at 120% so it fills its cup, in the page's soft hand: `line-art` outlines (about 2.2px for a shape's edge, 1.2 to 1.9px for folds and details), flat fills. Wrappers take a flavour other than the mascot's (`salmon`, `pistachio`). The flag's word sits whole inside its pennant.

The consumer provides the cups' drawings, the product's colours for its praline, and the link to its section. A `Note` ("try one") may point at the praline from above the box, starting at its words. The box runs to the column's right edge, with the mascot overhanging it there; a recipe card pointing to the writing tucks under its bottom-left corner (`Writing`).

- Do: one product praline per product, left-overs in the rest.
- Don't: a box inside a box, the mascot inside the box, a left-over that links anywhere.

`Praline` is the plain tile the box used before: keep it for a box of flat tiles.
