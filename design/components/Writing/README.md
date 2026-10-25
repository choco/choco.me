The things Enrico writes down, "From the kitchen": a list on the home page, an index of everything, and the articles themselves, with recipe cards to carry you from one to the next.

On the home page the section has a `label` ("FROM THE KITCHEN" in `lavender-text`), a `display-l` headline ("Things I wrote down") and, at its right, "All writing" with an arrow. Below it, the newest posts as a list (`cm-wlist`): each row is a link with a turning sprinkle (`cm-wlist__dot`, its flavour set with `--flavour`), the month, the title in `title` weight and the reading time, divided by dashed `line` rules. On phones the month hides and the reading time drops under the title.

While there is nothing to read, the section shows the empty notebook instead (`cm-wempty`), and the headline becomes "Things I'll write down":

- Three blank rows (`cm-wrow`): the first says "soon" where the month goes and, in Shantell, "testing the first recipe…" with a colour pencil after it that scribbles now and then (`cm-wempty__pencil`); the other two are bare rules whose sprinkles fade to half and a quarter (`cm-wrow--blank`).
- A stack of three blank recipe cards resting on the right of the rows (`cm-wempty__stack`, `cm-blank`): lemon, blueberry and lavender bands, ruled lines, the top card titled "Recipe no. 1" by hand. They fan out on hover. On phones they shrink and rest on the two blank rows, below the handwriting.
- One line under the rows (`cm-wempty__follow`): "I'll share it on Bluesky and Mastodon when it's ready.", both links to Enrico's profiles.
- "All writing" hides, and the recipe card tucked under the box (`Box`) reads "first one soon" instead of how many recipes are inside.

A recipe card (`cm-recipe`) is a `surface` card with a 2px `line` edge and a scalloped band in a flavour across its top (`cm-recipe__top`), then the month and reading time (`cm-recipe__meta`), the title (`cm-recipe__title`) and one sentence (`cm-recipe__text`). It lifts and tilts on hover. The band is 1px shorter than its gradient tile, so a tilted card shows no seam. The same card, small and tilted, tucks under the box's corner on the home page ("Writing / 3 recipes inside").

An article's paragraphs sit in `cm-prose`: 18px Onest with 1.7 line height, at most 600px wide, in `ink-body`. At night they drop to weight 380 with 0.01em tracking and 1.75 line height, and an illustration sits on `surface`, never on a white panel. Headlines take `display-l`, brought down to 40px on phones. Handwritten notes may point into the article from its margin. "More from the kitchen" at the end is a row of recipe cards.

The consumer provides the posts (title, month, reading time, flavour, one sentence) and, with none, the empty notebook's markup as in the preview.

- Do: one flavour per post, kept with it everywhere it appears; the empty notebook until the first article ships.
- Don't: a placeholder article, "coming soon" in a headline, more than one empty-state drawing.
