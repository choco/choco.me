# choco.me

The source of Enrico Ghirardi's personal site, [choco.me](https://choco.me): its design system
and the site built from it.

- `design/`: the design system: tokens, components, assets, fonts and their licences. Start with
  its README; a change to the design starts there.
- `site/`: the site, prerendered to static HTML. It takes its tokens from `design/tokens.json`; a
  product's section takes that product's tokens and fonts from `site/vendor/<product>/`, copied
  from the product's own design system.
- `.github/workflows/pages.yml`: builds `site/` and deploys it to GitHub Pages on every push to
  `master` that touches the site or the design system.

## Working on the site

Work inside `nix develop`, which provides the toolchain. Then, from `site/`:

```sh
pnpm install
pnpm dev        # serves the site, prerendered as the build does
pnpm typecheck
pnpm check      # lints and checks formatting; pnpm format applies the fixes
pnpm build      # writes build/site, as Pages serves it
```

Writing goes in `site/src/data/posts.ts`; while it's empty, the home page shows the writing's
empty state.

## License

The code is MIT-licensed and the writing is CC BY 4.0; the artwork and the design are all
rights reserved. [`LICENSE`](LICENSE) says which is which, and lists the third-party
material with its own licences.
