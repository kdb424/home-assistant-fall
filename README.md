# Home Assistant Fall Mode

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=kdb424&repository=home-assistant-fall&category=plugin)

A HACS-installable frontend plugin that adds falling autumn leaves to the
Home Assistant UI, mirroring the built-in winter snowflake mode.

## Repositories

- Primary (Forgejo): https://git.kdb424.xyz/kdb424/home-assistant-fall
- GitHub mirror (for HACS): https://github.com/kdb424/home-assistant-fall

## Install via HACS

1. Open HACS in Home Assistant.
2. Go to **Frontend**.
3. Open the menu (top right) and choose **Custom repositories**.
4. Add this repository URL and select category **Plugin** (or **Lovelace**).
5. Install **Home Assistant Fall Mode**.
6. Restart Home Assistant if prompted.

## Use

Add the resource to your dashboard/Lovelace resources (HACS usually does
this automatically):

```yaml
resources:
  - url: /hacsfiles/home-assistant-fall/ha-leaves.js
    type: module
```

Then add the element where you want it (for example in a dashboard card or
panel). The leaves only render when `enabled` is true:

```html
<ha-leaves enabled narrow></ha-leaves>
```

Attributes:

- `enabled` — show the leaves.
- `narrow` — hide some leaves on small screens.
- `darkMode` — use the dark-theme color set.

## Notes

- Respects `prefers-reduced-motion`.
- This is a standalone plugin, not a Labs feature; it is not toggled from
  Home Assistant settings like the built-in winter mode.
- Based on the `ha-snowflakes` component from Home Assistant frontend.
