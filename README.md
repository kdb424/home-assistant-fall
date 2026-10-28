# Home Assistant Seasonal Mode

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=kdb424&repository=home-assistant-fall&category=plugin)

A HACS-installable frontend plugin that adds falling seasonal effects to the
Home Assistant UI, mirroring the built-in winter snowflake mode.

Includes four variants:

- **Fall** — autumn leaves.
- **Spring** — green leaves.
- **Summer** — cherry blossom petals.
- **Winter** — snowflakes (the built-in winter mode is still separate).

The variant is chosen automatically from the current month, or set manually.

## Repositories

- Primary (Forgejo): https://git.kdb424.xyz/kdb424/home-assistant-fall
- GitHub mirror (for HACS): https://github.com/kdb424/home-assistant-fall

## Install via HACS

1. Open HACS in Home Assistant.
2. Go to **Frontend**.
3. Open the menu (top right) and choose **Custom repositories**.
4. Add this repository URL and select category **Plugin** (or **Lovelace**).
5. Install **Home Assistant Seasonal Mode**.
6. Restart Home Assistant if prompted.

## Use

The module auto-injects the overlay when it loads, so you only need to
load it. Easiest is via `configuration.yaml`:

```yaml
frontend:
  extra_module_url:
    - /hacsfiles/home-assistant-fall/ha-leaves.js
```

Or as a Lovelace resource:

```yaml
lovelace:
  resources:
    - url: /hacsfiles/home-assistant-fall/ha-leaves.js
      type: module
```

Restart Home Assistant after adding. The effect appears automatically. No
card or YAML placement is needed.

## Attributes / properties

- `enabled` — show the effect.
- `narrow` — hide some items on small screens.
- `darkMode` — use the dark-theme color set.
- `season` — `auto` (default), `fall`, `spring`, `summer`, or `winter`.
- `hemisphere` — `north` (default) or `south`, used for auto season.

Example (manual season):

```html
<ha-leaves season="summer" darkMode></ha-leaves>
```

## Notes

- Respects `prefers-reduced-motion`.
- This is a standalone plugin, not a Labs feature; it is not toggled from
  Home Assistant settings like the built-in winter mode.
- Auto season uses the browser's current month (Northern hemisphere by
  default). For a Home Assistant-driven season, set `season` from the
  `season` integration sensor via a small script or card.
- Based on the `ha-snowflakes` component from Home Assistant frontend.
