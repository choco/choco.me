choco.me is Enrico Ghirardi's personal page, and the front door to Nightcap and whatever comes after it. The page is a box of chocolates with one praline left. Nightcap is the one still in its cup, glowing; the others have been eaten, and the chocolate bar standing beside the box says "the rest? wasn't me". Below the box, each product gets a section of its own, then the things Enrico writes down, and the page ends in a mug of hot cocoa.

White space carries the story, as on a well-kept Instagram grid: one idea per screen, a lot of air around it, and colour only where something is.

## The page

- The hello: a label naming where Enrico comes from and lives ("MADE IN ITALY · LIVING IN ZURICH"), the name, a line about Enrico, the social icons (`Socials`), and the box of one (`Box`) with the mascot (`Mascot`) beside it and a recipe card tucked under its corner pointing to the writing.
- One section per product, each in that product's own design (`Section`). Nightcap's is the only one so far.
- From the kitchen: the things Enrico writes down, as a list, or a notebook still waiting for its first recipe (`Writing`).
- The footer: hot cocoa, with whipped cream, sprinkles and a marshmallow saving a seat for the next sponsor (`HotCocoa`).
- The page has no navigation bar and no wordmark: "choco" is a nickname, not a product. The page opens on the hello, the social icons carry the links, and a praline jumps to its product's section.

## Voice

Write the way Enrico would answer a friend who asked "so, what do you do?".

- Write as "I", to "you".
- Use plain words and short sentences, with one small joke where it fits. The hello sets the tone: "Software engineer who loves UI design and illustration, and breaking into things. I cook, and I never say no to pizza or chocolate."
- "choco" is always lowercase.
- Headlines and running text use sentence case, with no full stop after a one-line headline ("Hi, I'm Enrico"). A button says where it goes or what happens: "Sponsor on GitHub", "Get Nightcap".
- No emoji: the doodles do that job. At most one exclamation mark on a page.
- Let the drawings and the notes carry the jokes ("the rest? wasn't me", "The next praline is still cooling."), and keep the words around them direct: "If you enjoy my apps and articles, any support is much appreciated." The line about Enrico has no joke about the box; the box tells its own.
- Inside a product's section, write in that product's own voice. Nightcap's is dry and specific: "Nightcap switches Night Shift off while the apps and websites you choose are in front, and gives it back when you leave them."
- The page signs off the way choco.me always has, quietly: "see you, space cowboy...", as a tiny `note-s` at the very bottom, for those who know Cowboy Bebop.

## Colour

- Lay the page on `ground` and sheets on `surface`. The inside of the chocolate box is `box`; a paper cup's pleats alternate `box` and `surface`.
- Set text in `ink` and secondary text in `ink-muted`.
- Each section takes its own ground, so the page changes as you scroll: `ground` for the hello, the product's own ground for its section, and `cocoa` for the footer. On `cocoa`, words are `milk`, secondary words `lavender`, and the primary action is a `lemon` flavour button.
- The seven flavours are `strawberry`, `apricot`, `lemon`, `pistachio`, `blueberry`, `lavender` and `salmon`. They are fills: foils, wrappers, sprinkles, the mascot, a highlight behind a word. Use several on a screen, since the variety is the point, and never put the same flavour side by side.
- `salmon` is the mascot's: its wrapper is `salmon` with a `pistachio` band. Don't give another large shape on the same screen a `salmon` or `pistachio` fill, so the mascot stays itself.
- Words and marks on a flavour are `on-flavour`, in both themes. A coloured word on `ground`, `surface` or `box` (a link, a name, a note) uses its flavour's `-text` token.
- Draw line doodles in a flavour's `-text` colour at 40 to 60% opacity, and sprinkles in the flavour itself at full strength.
- `chocolate` with `on-chocolate` is the primary action on `ground`, once per view.
- The dark theme is dark chocolate. The flavours stay as they are and glow against it, and each `-text` token becomes its flavour. The box's illustrations, the mascot and the hot cocoa look the same in both themes, as objects do, except the whipped cream, which is `cream`: an off-white at night so nothing on the page glares.
- Set long running text, such as an article, in `ink-body`: the same as `ink` by day, a step softer at night. At night nothing sits on a white panel: an illustration that needs a sheet uses `surface`.
- Every focusable thing gets a 2px `focus` ring, 2px out.

## Type

- Set display type in Gluten (`display-xl`, `display-l`, `display-m`) at weight 800 to 900: a chewy, rounded face that reads like piped chocolate. Use one `display-xl` per page, for the hello, and Gluten for the footer's line. Never set it in capitals, below 32px or on more than two lines.
- Set everything else in Onest: `lead` under a headline, `body` for running text near 65 characters a line, `title` for a card's name, `small` for captions and the footer's row, `label` in capitals for eyebrows. An article's paragraphs are 18px with 1.7 line height; at night they drop to weight 380 with 0.01em tracking and 1.75 line height, since light text on a dark ground reads heavier.
- Set handwritten asides in Shantell Sans (`note`, `note-s`), each pointing at its subject with the curly arrow (`Note`). Keep them fully informal (`"INFM" 100`). Use four notes on a page at most, and never a paragraph. Don't stack two handwritten lines close together: anything set near a note is in Gluten or Onest.
- Inside a product's section, use that product's type.

## Space and shape

- Set content in the `column` (864px, Nightcap's), with side gutters of `space-4` on phones and `space-12` on wide screens. Section backgrounds run full-bleed around it.
- Spend white space generously. Sections sit `space-32` apart on wide screens and `space-20` on phones, and a headline gets `space-12` before what it introduces.
- Use `radius-sm` for chips and small tiles, `radius-md` for cups, `radius-lg` for the box, and `radius-pill` for buttons, social icons and sprinkles.
- Things that sit in the box cast `shadow-sit`; nothing else casts a shadow, apart from what a product section brings with it.

## Product sections

- A product's section wears that product's design system: its tokens, type and components, scoped to the section, so its names (`ink`, `ground`, `surface`) take that system's values inside it and nowhere else. The section follows the page's theme with the product's own light and dark themes.
- choco.me only frames it: plain paper-cup scallops along its top and bottom edges in the product's ground (no outline, no trim), and at most one `Note` pointing into it from outside.
- The product's praline in the box wears the same product's colours, so the box and the section match.

## Motion

- Things move like soft candy. They pop with `ease-pop` over `dur-pop` and settle; fades and drifts use `ease-soft`.
- On hover or focus the praline lifts and tilts, and its flag wiggles.
- Ambient motion is slow: doodles sway, handwritten notes bounce letter by letter as Shantell Sans' bounce axis moves them, the mascot blinks every few seconds, waves, and its eyes follow the pointer, the praline still in the box glows and dims, and the empty notebook's pencil scribbles now and then; in the footer, steam rises, sprinkles sink and the marshmallow lets out a bubble. Reaching "Sponsor on GitHub" wakes the marshmallow and drops a second one into its saved seat.
- Motion never carries meaning on its own.
- With reduced motion, everything stays at rest and states change instantly.

## Illustration

- Draw everything in one soft hand: outlines in `line-art`, a warm mid-brown, with round caps and joins (about 2.2 to 3.1px for the mascot, the box's contents and the marshmallows at their drawn size), and flat pastel fills. Small darks stay `cocoa`: eyes, mouths, the mascot's chocolate (whose edge is a darker brown, #4a2c24, so it doesn't melt into its outline). Gradients are only for sheen and glow. Doodles are the exception: single-line art in a flavour's `-text` colour.
- The mascot is a chocolate bar (`Mascot`). It is the page's one character, and it stands beside the box, never in it.
- The box's contents are drawn things, not tiles: the product's wrapped praline with a flag, and what is left of the others (`Box`).
- The footer's marshmallows are props, drawn kawaii-soft: a tall, slightly bulging cylinder with a paler top, dot eyes with a catchlight, a small smile or an open grin with a tongue, and "///" blush; asleep, closed arcs and a small "o". They sit in the cocoa, never on the cream.
- Doodles are line art on a 32 grid with 2.5px strokes: sprinkles, swirls, hearts, cocoa beans, squiggles, daisies, dots, pizza slices (Enrico loves pizza), a bitten chocolate bar and the curly arrow (`Doodles`). Scatter them like sprinkles on a cake: densest around the hello, sparse through the middle. A doodle never touches text or a drawing, at any width: where the layout narrows and one would, hide it at that width rather than let it overlap, and on the site place them with a clearance check around the content. On phones, keep about one in three.

## Iconography

- The doodles are the icons, at 24 or 32px, or 18px inline in small text, where a doodle can stand in for a word ("made with [chocolate] and [love]"). There is no icon font and no emoji.
- Social links are round icon buttons (`Socials`): mail, Bluesky, Mastodon, GitHub and LinkedIn, in that order, each on its own flavour. The marks come from Simple Icons (CC0; LinkedIn from Bootstrap Icons, MIT), unchanged; the envelope is drawn to match.
- Every arrow is the curly arrow, looping on the way from the words to their subject, and starting at the words.
- Nightcap's mark is its app icon (`Projects`), exactly as Nightcap ships it.

## On a page

- `licenses/` holds the licence of everything here drawn or set by others: the three faces (SIL Open Font License) and Bootstrap Icons (MIT). Ship them with whatever uses the faces or the marks; the site puts them under `licenses/`.
- `tokens.json` holds every value. The site turns it into CSS variables (`site/plugins/design.ts` writes `site/src/styles/tokens.css`, with the three faces from `fonts/`): change a value in `tokens.json`, never in generated CSS.
- `components/bundle.css` and each component's `preview.html` show the components on their own, reading the same variables; the site's components are their React counterparts.
- For a product section, generate a scoped stylesheet from that product's `tokens.json`: its light theme on the section's class and its dark theme wherever the page is dark, then build the section with the product's own components inside it. The site keeps each product's tokens and fonts in `site/vendor/<product>/`.
