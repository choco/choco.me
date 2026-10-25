import type { CSSProperties } from "react";

/** Custom properties for an inline style, which React's style type doesn't model. */
export const vars = (values: Record<`--${string}`, string>) =>
	values as CSSProperties;
