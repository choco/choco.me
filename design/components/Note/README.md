A handwritten aside in Shantell Sans that points at its subject with the curly arrow, tilted a little and swaying slowly.

Place it outside its subject, with the arrow starting at the words and ending at the subject: put the arrow on the subject's side of the words, turned so its tail is at the words, and level with them (when the arrow comes first, align the note's items to the top). `cm-note--flip` mirrors the arrow. Always use the curly arrow glyph (`arrow-curl.svg`), never a longer drawn one: move the note closer instead. Colour it with `--note`, a flavour's `-text` token (`ink-muted` by default). With reduced motion it stays still.

The consumer provides the words, lowercase and under about six of them, and the arrow as an inline SVG in `currentColor`.

- Do: "try one", "the rest? wasn't me" (on two lines), "the last one, unwrapped", "hot cocoa, careful", "testing the first recipe…".
- Don't: a full sentence of information, a note over text, more than four on a page, two handwritten lines close together.
