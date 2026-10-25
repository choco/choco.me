Round icon buttons for the places to find Enrico: mail, Bluesky, Mastodon, GitHub and LinkedIn, in that order, each on its own flavour.

Use them once, in the hello, under the line about Enrico. Don't repeat them in the footer. Each is an `<a class="cm-social">` with an `aria-label` naming the place ("Email hello@choco.me", "Bluesky", "Mastodon", "GitHub", "LinkedIn") and its icon inline in `currentColor`; set its flavour with a flavour class or `--flavour`: mail `apricot`, Bluesky `blueberry`, Mastodon `lavender`, GitHub `pistachio`, LinkedIn `lemon`. Keep `strawberry` off them: it is the name's highlight. The Mastodon link carries `rel="me"`, so the profile can verify the site.

The Bluesky, Mastodon and GitHub marks are Simple Icons' (CC0) and LinkedIn's is Bootstrap Icons' (MIT; Simple Icons dropped it), all unchanged; the envelope is drawn to sit with them, its flap cut out in the button's flavour.

- Do: mail first, as `mailto:hello@choco.me`; Bluesky as `https://bsky.app/profile/chocobuono.bsky.social`; Mastodon as `https://mastodon.social/@chocobuono`; GitHub as `https://github.com/choco`; LinkedIn as `https://www.linkedin.com/in/enrico-ghirardi/`.
- Don't: labels under the icons, X, more than five, the same set twice on a page.
