import { css, html, LitElement, nothing } from "https://esm.sh/lit@3";
import { customElement } from "https://esm.sh/lit@3/decorators.js";
import { styleMap } from "https://esm.sh/lit@3/directives/style-map.js";

const LEAF_PATHS = [
  "M8 1 C10 3 12 6 11 9 C13 8 15 9 15 11 C15 13 13 14 11 13 C12 15 11 16 8 16 C5 16 4 15 5 13 C3 14 1 13 1 11 C1 9 3 8 5 9 C4 6 6 3 8 1 Z",
  "M8 1 C9 3 10 5 9 7 C11 6 13 7 13 9 C13 11 11 12 9 11 C10 13 9 16 8 16 C7 16 6 13 7 11 C5 12 3 11 3 9 C3 7 5 6 7 7 C6 5 7 3 8 1 Z",
  "M8 1 C11 3 13 7 13 11 C13 14 11 16 8 16 C5 16 3 14 3 11 C3 7 5 3 8 1 Z",
  "M8 1 C9 4 10 8 9 12 C10 12 11 13 10 15 C9 16 7 16 6 15 C5 13 6 12 7 12 C6 8 7 4 8 1 Z",
];

const LEAF_COLORS_LIGHT = ["#c0392b", "#d35400", "#e67e22", "#f39c12", "#7d3c98"];
const LEAF_COLORS_DARK = ["#e74c3c", "#e67e22", "#f1c40f", "#d35400", "#9b59b6"];

@customElement("ha-leaves")
export class HaLeaves extends LitElement {
  static properties = {
    enabled: { type: Boolean },
    narrow: { type: Boolean },
    darkMode: { type: Boolean },
    _leaves: { state: true },
  };

  constructor() {
    super();
    this.enabled = false;
    this.narrow = false;
    this.darkMode = false;
    this._leaves = [];
  }

  get _maxLeaves() {
    return 45;
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has("enabled") || changedProps.has("darkMode")) {
      this._generateLeaves();
    }
  }

  _generateLeaves() {
    if (!this.enabled) {
      this._leaves = [];
      return;
    }
    const colors = this.darkMode ? LEAF_COLORS_DARK : LEAF_COLORS_LIGHT;
    const leaves = [];
    for (let i = 0; i < this._maxLeaves; i++) {
      leaves.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 16 + 12,
        duration: Math.random() * 6 + 8,
        delay: Math.random() * 8,
        rotation: Math.random() * 720 - 360,
        sway: Math.random() * 40 - 20,
        type: Math.floor(Math.random() * LEAF_PATHS.length),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    this._leaves = leaves;
  }

  render() {
    if (!this.enabled) return nothing;
    return html`
      <div class="leaves ${this.darkMode ? "dark" : "light"}" aria-hidden="true">
        ${this._leaves.map((leaf) => html`
          <svg
            class="leaf ${this.narrow && leaf.id >= 28 ? "hide-narrow" : ""}"
            style=${styleMap({
              left: `${leaf.left}%`,
              width: `${leaf.size}px`,
              height: `${leaf.size}px`,
              "animation-duration": `${leaf.duration}s`,
              "animation-delay": `${leaf.delay}s`,
              "--rotation": `${leaf.rotation}deg`,
              "--sway": `${leaf.sway}px`,
              color: leaf.color,
            })}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d=${LEAF_PATHS[leaf.type]} fill="currentColor" />
          </svg>
        `)}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    .leaves {
      position: absolute;
      top: -10%;
      left: 0;
      width: 100%;
      height: 110%;
      pointer-events: none;
    }
    .leaf {
      position: absolute;
      top: -10%;
      opacity: 0.85;
      user-select: none;
      pointer-events: none;
      animation: fall linear infinite;
      transform-origin: center;
    }
    .leaf.hide-narrow { display: none; }
    @keyframes fall {
      0% { transform: translateY(-10vh) translateX(0) rotate(var(--rotation)); }
      25% { transform: translateY(30vh) translateX(var(--sway)) rotate(calc(var(--rotation) + 45deg)); }
      50% { transform: translateY(60vh) translateX(calc(var(--sway) * -0.5)) rotate(calc(var(--rotation) + 90deg)); }
      75% { transform: translateY(85vh) translateX(var(--sway)) rotate(calc(var(--rotation) + 135deg)); }
      100% { transform: translateY(120vh) translateX(0) rotate(calc(var(--rotation) + 180deg)); }
    }
    @media (prefers-reduced-motion: reduce) {
      .leaf { animation: none; display: none; }
    }
  `;
}
