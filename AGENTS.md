# choco.me

Enrico Ghirardi's personal site: a design system (`design/`) and the static site built from it (`site/`). This repository is the source of truth for both.

## Development

Work inside `nix develop`, which provides the toolchain; the site's scripts are in `site/package.json`. `pnpm --dir site dev` serves the site prerendered the same way the build does, with hot reload. `vite preview` doesn't serve `404.html` for a missing path the way GitHub Pages does: check the 404 page at `/404.html`.

Check layout changes in WebKit at phone width (375px) as well as on desktop, in light and dark: the site is reviewed in Safari, and WebKit-only layout bugs don't show in Chrome.

Dependencies are pinned to exact versions at least two weeks old; `site/pnpm-workspace.yaml` enforces the age for transitive ones too.

Biome lints and formats the site with its recommended defaults (`pnpm check`, and `pnpm format` to apply fixes); CI runs `biome ci`. It stands in for ESLint because typescript-eslint doesn't support TypeScript 7 yet.

## Site

The site is React and TypeScript, built with Vite and pnpm and prerendered at build time (`prerender.ts`), so each page arrives whole and React hydrates it; anything that depends on the visitor (the saved appearance, the pointer) is read after hydration. Each component keeps its measures in a CSS module beside it; Tailwind supplies little beyond the theme's colours and type families.

- `site/plugins/design.ts` writes `src/styles/tokens.css` from `design/tokens.json`, `src/styles/nightcap.css` from `site/vendor/nightcap/`, and the design system's fonts into `src/styles/fonts/`, each variable face cut to the axes its `KEPT` table names. All are build outputs: change the tokens or the table, never the output. Setting a weight or axis value the table doesn't keep renders the nearest one kept, so widen the table first. Each face also gets stand-ins, local fonts sized to its metrics at the weight `MATCHED_AT` names, so the page doesn't move when the face arrives. Set a measure in `em`, never `ch`: a `ch` is the width of whatever face is drawing, the stand-in's until the face loads.
- A handwritten note's words go in `src/data/notes.ts`. `site/plugins/notes.ts` reads each line's letters from Shantell Sans, and the `Note` bounces them one by one with CSS transforms, which run off the main thread; animating a font's axes would re-lay-out the text every frame.
- Motion is nearly free in Safari only while WebKit's compositor runs all of it: transform and opacity keyframes on HTML elements and `<svg>` roots. WebKit runs an animation of an element inside an `<svg>` on its main thread, and then restyles every animated element on the page every frame, so a drawing's moving part is an `<svg>` of its own, stacked over the rest with the same viewBox (see `Mascot`). A listener for animation events does the same; `src/hydrate.tsx` turns React's away. Check a change's idle CPU in Safari.
- A value that differs by theme is a variable set three times: light on `:root`, dark under `@media (prefers-color-scheme: dark)` for `:root:not([data-theme="light"])`, and dark under `:root[data-theme="dark"]` (see `src/styles/main.css`).
- Doodles and sprinkles sit in a `Scatter` layer, each at a `Spot`. At every width, the page's clearance check hides any that would touch text or an element marked `data-clear`: mark every drawing, button and card you add with `data-clear`.
- `site/public/og.png`, the social card, is a 1200 × 630 render of the top of the home page in light mode; render it again when the hello changes.

## Design

Design work starts from `design/README.md`, the design system's brand book, with its tokens, fonts, licences and component previews beside it. A design change lands there first, then in the site. A product's section uses that product's own design system, vendored under `site/vendor/<product>/`.

Write the repository's docs to stay true: what something is, where it lives, how to work on it. Leave out what changes with the page's content, such as the products featured right now or tool versions the config already states.
