The page's one character: a chocolate bar with a bite out of its top, in a `salmon` wrapper with a `pistachio` band, leaning a little to the right and waving.

Use it once per page, beside the box (`Box`), never inside it: it is the one who ate the rest, and denies it with a `Note` on two lines, "the rest? / wasn't me", set beside it with the arrow pointing at the bar. It stands at the box's bottom-right corner, overhanging the box's edge by about 34px; the box itself runs to the column's edge. It blinks every few seconds, waves, and its eyes follow the pointer: move the `.eyes` group by up to 3.5px towards the pointer.

The drawing is fixed; its colours come from `--wrap` and `--band` (`salmon` and `pistachio` by default). `cm-mascot--upright` stands it straight. Its chocolate is `bar` and `bar-top`, its outline the soft `line-art` (3.1px for the arms and the wrapper, 2.8px for the hands, 2.5px for the foil, 2.2px for the band), the chocolate's own edge a darker #4a2c24, its eyes `cocoa` and its cheeks `mascot-blush`, the same in both themes.

How it's drawn, for anyone redrawing it: a short, wide body; bevelled chocolate squares, three across and two down, with a bite taken out of the top-right corner; silver foil as wide as the wrapper, hugging the chocolate up its sides and torn open in a dip, with its top-left corner peeled outward to show the duller inside, meeting the wrapper's square top; a wrapper with rounded bottom corners and a band across it; thin arms with round hands, one raised; two dot eyes with two catchlights each, a small open smile and blush. It leans right, never left.

The consumer provides the inline SVG (`assets/Characters/chocolate-bar.svg` is the same drawing in fixed colours) and, for the eyes, a pointer handler.

- Do: one bar, beside the box, about 120 to 140px wide on wide screens.
- Don't: a second character, the bar inside the box or the footer, the bar leaning left.
