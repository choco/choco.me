The footer: the page pours into a mug of hot cocoa, with whipped cream and sprinkles on top, steam rising, a few sprinkles sinking, and a marshmallow inside it saving a seat for the next sponsor.

From top to bottom:

- The surface (`cm-cocoa__scene`): a 1440 × 170 inline SVG, cropped at the sides on narrow screens. Faint steam, the cocoa, then whipped cream in `cream` (white by day, a warm off-white at night) with pastel sprinkles and a `cocoa` crest. A `Note` above it says "hot cocoa, careful", its arrow pointing down into it.
- The body (`cm-cocoa__body`), on `cocoa`: sinking sprinkles (`cm-sinker`) in the margins only, never over the words; a line in Gluten (`cm-cocoa__line`, "The next praline is still cooling."), one direct sentence in `lavender` (`cm-cocoa__text`, "If you enjoy my apps and articles, any support is much appreciated."), and the `lemon` "Sponsor on GitHub" button. Beside them, the saved seat (`cm-marshmallow cm-marshmallow--seat`): a pink marshmallow asleep, bubbles rising, next to a dashed empty seat that pulses slowly. Put both in `cm-cocoa__sponsor`: reaching the button wakes the pink one (`.me` swaps `.zz` for `.awake`) and drops a vanilla one, grinning, into the seat (`.friend`); its drop overshoots the seat, so the drawing keeps visible overflow. The sentence doesn't explain the seat; the drawing does.
- The row (`cm-cocoa__row`), set apart by space alone: "© 2026 Enrico Ghirardi · made with [chocolate] and [love]", the two words drawn as the `chocolate.svg` and `heart.svg` doodles inline (`cm-made`, in `apricot` and `strawberry`, labelled "chocolate" and "love" for screen readers; the heart beats once on hover), and the appearance switch (`cm-switch`). Zurich is in the hello already, so the footer doesn't repeat it.
- The sign-off (`cm-cocoa__signoff`): "see you, space cowboy...", tiny and quiet, at 80% opacity so it still reads (6.9:1).

On phones the body becomes one centred column: the line, the sentence and the button, then the marshmallows as the break before the row, whose copyright splits after the name, then the switch and the sign-off.

The consumer provides the copy, the switch's behaviour, and the sponsor link.

- Do: keep it quiet: the marshmallow and its seat, a few sprinkles, faint steam.
- Don't: the social icons again, the mascot in the cocoa, a marshmallow floating on the cream, a divider of any kind (the sinking sprinkles already scatter colour there).
