# Home Assistant seasonal UI modes

## Question

Does Home Assistant have a fall/autumn mode with falling leaves, like the
secret winter mode with snowflakes?

## Answer

No. As of the current Home Assistant frontend, only a winter mode exists.
There is no built-in autumn/fall mode and no leaf animation.

## Winter mode details

- Implemented by the `ha-snowflakes` custom element
  (`src/components/ha-snowflakes.ts` in `home-assistant/frontend`).
- Enabled through the Labs preview feature `frontend.winter_mode`.
- When enabled, it renders up to 50 SVG snowflakes with randomized position,
  size, duration, delay, and rotation.
- Appearance changes for dark vs. light themes; some flakes hide on narrow
  viewports.
- Respects `prefers-reduced-motion`.
- Included in the main layout (`home-assistant-main`), so it overlays the UI.

## Related but separate

- The `season` integration exposes an `autumn`/`spring`/`summer`/`winter`
  sensor state. It is unrelated to Labs preview features and has no visual
  effect.

## If you want a fall version

It would need to be built, e.g. a new `ha-leaves` component plus a
`frontend.autumn_mode` (or `fall_mode`) lab feature mirroring
`winter_mode`. Nothing like that exists upstream today.
