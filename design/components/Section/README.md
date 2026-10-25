A product's section: a full-bleed band in the product's own ground, edged top and bottom with paper-cup scallops, holding that product's design inside.

Put the product's whole section inside `cm-section`, edged with plain scallops (no outline, no trim), with the product's design system scoped to it: generate a stylesheet from the product's `tokens.json` that sets its light theme on the section's class and its dark theme under `[data-theme="dark"]`, load the product's fonts and component styles, and build the content with the product's components and voice. Its `--scallop` is the product's ground; the scallops and the band follow it, so they change with the theme too.

choco.me adds nothing inside the band. Outside it, one `Note` may point in ("the last one, unwrapped").

The consumer provides the product's scoped stylesheet, its content, and the section's `id`, which its praline links to.

- Do: Nightcap's section in Nightcap's navy and Caprasimo, with two buttons of one size (52px tall, 16px text, 22px padding), each with its icon: "Get Nightcap" with the moon, gold with Nightcap's darker gold edge and a slow shine, and "View on GitHub" with the GitHub mark, outlined. Both spring on hover (lift and grow to 104%); the outlined one also fills with a soft tint and darkens its edge. Beside them, Nightcap's own macOS scene, as its site draws it: the wallpaper (day or night), a translucent menu bar with the Apple menu, "Figma" and its menus (hidden on phones), the pressed moon before the clock, a dark Figma window with its poster, and Nightcap's menu open over it.
- Don't: choco.me's flavours or fonts inside a product's band, a product section without scallops.
