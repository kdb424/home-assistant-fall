import type { PropertyValues } from "lit";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators";
import { styleMap } from "lit/directives/style-map";

interface Leaf {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  sway: number;
  tilt: number;
  tumble: boolean;
  blow: boolean;
  type: number;
  color: string;
}

const FALL_PATHS = [
  "M8 1 C10 3 12 6 11 9 C13 8 15 9 15 11 C15 13 13 14 11 13 C12 15 11 16 8 16 C5 16 4 15 5 13 C3 14 1 13 1 11 C1 9 3 8 5 9 C4 6 6 3 8 1 Z",
  "M8 1 C9 3 10 5 9 7 C11 6 13 7 13 9 C13 11 11 12 9 11 C10 13 9 16 8 16 C7 16 6 13 7 11 C5 12 3 11 3 9 C3 7 5 6 7 7 C6 5 7 3 8 1 Z",
  "M8 1 C11 3 13 7 13 11 C13 14 11 16 8 16 C5 16 3 14 3 11 C3 7 5 3 8 1 Z",
  "M8 1 C9 4 10 8 9 12 C10 12 11 13 10 15 C9 16 7 16 6 15 C5 13 6 12 7 12 C6 8 7 4 8 1 Z",
];

const SPRING_PATHS = FALL_PATHS;

const PETAL_PATHS = [
  "M8 1 C12 4 14 8 8 15 C2 8 4 4 8 1 Z",
];

const SNOWFLAKE_PATH =
  "M7.991 0a.644.644 0 0 1 .283 1.221v2.553l.986-.988a.645.645 0 0 1 .612-.839.644.644 0 1 1-.222 1.247l-1.376 1.38V7.52l1.65-.954.466-1.879a.645.645 0 0 1 .1-1.042.643.643 0 1 1 .445 1.189l-.363 1.356 3.145-1.82a.643.643 0 1 1 .282.49l-2.205 1.277 1.347.361a.643.643 0 1 1-.158.543l-1.88-.505L8.573 8l1.632.945 1.858-.535a.64.64 0 0 1 .95-.434.643.643 0 1 1-.805.98l-1.354.364L14 11.14a.641.641 0 0 1 .914.855.643.643 0 0 1-1.197-.366l-2.205-1.276.36 1.35a.642.642 0 0 1 .419.95.643.643 0 1 1-.967-.816l-.503-1.884L8.273 8.48v1.909l1.39 1.344a.644.644 0 1 1 .208 1.252.644.644 0 0 1-.606-.852l-.991-.994v3.64A.644.644 0 0 1 7.99 16a.644.644 0 0 1-.282-1.221v-2.553l-.986.988a.645.645 0 0 1-.612.839.644.644 0 1 1 .222-1.247l1.376-1.38V8.5l-1.632.945-.467 1.879q.079.068.134.163a.643.643 0 1 1-.68-.31l.364-1.357-3.145 1.82A.643.643 0 1 1 2 11.15l2.205-1.276-1.347-.361a.643.643 0 1 1 .158-.543l1.88.505L7.444 8l-1.65-.954-1.857.534a.64.64 0 0 1-.95.434.643.643 0 1 1 .805-.98l1.354-.364L2 4.85a.641.641 0 0 1-.914-.855.643.643 0 0 1 1.197.366l2.205 1.276-.36-1.35a.642.642 0 0 1-.419-.95.643.643 0 1 1 .967.816l.503 1.884L7.71 7.5V5.611L6.32 4.267a.644.644 0 1 1-.208-1.252.644.644 0 0 1 .607.852l.991.994V1.22A.644.644 0 0 1 7.991 0";
const SNOWFLAKE_PATHS = [SNOWFLAKE_PATH];

const LEAF_COLORS_LIGHT = ["#c0392b", "#d35400", "#e67e22", "#f39c12", "#f1c40f"];
const LEAF_COLORS_DARK = ["#e74c3c", "#e67e22", "#f1c40f", "#d35400", "#f4d03f"];

const SPRING_COLORS_LIGHT = ["#2ecc71", "#27ae60", "#1abc9c", "#58d68d", "#82e0aa"];
const SPRING_COLORS_DARK = ["#58d68d", "#82e0aa", "#a9dfbf", "#2ecc71", "#1abc9c"];

const PINK_COLORS = ["#ffd1dc", "#fbc2d7", "#f9a8d4", "#ffe4ec", "#f4c2d7"];
const PINK_COLORS_DARK = ["#f9a8d4", "#fbc2d7", "#ffd1dc", "#ffe4ec", "#f4c2d7"];

interface SeasonConfig {
  paths: string[];
  colorsLight: string[];
  colorsDark: string[];
  swayAmp: number;
  tiltMin: number;
  tiltRange: number;
  tumbleProb: number;
  blowProb: number;
  durationMin: number;
  durationRange: number;
}

const SEASON_CONFIG: Record<string, SeasonConfig> = {
  fall: {
    paths: FALL_PATHS,
    colorsLight: LEAF_COLORS_LIGHT,
    colorsDark: LEAF_COLORS_DARK,
    swayAmp: 100,
    tiltMin: 40,
    tiltRange: 30,
    tumbleProb: 0.2,
    blowProb: 0.1,
    durationMin: 8,
    durationRange: 6,
  },
  spring: {
    paths: SPRING_PATHS,
    colorsLight: SPRING_COLORS_LIGHT,
    colorsDark: SPRING_COLORS_DARK,
    swayAmp: 30,
    tiltMin: 10,
    tiltRange: 10,
    tumbleProb: 0.05,
    blowProb: 0,
    durationMin: 6,
    durationRange: 4,
  },
  summer: {
    paths: PETAL_PATHS,
    colorsLight: PINK_COLORS,
    colorsDark: PINK_COLORS_DARK,
    swayAmp: 40,
    tiltMin: 10,
    tiltRange: 15,
    tumbleProb: 0,
    blowProb: 0,
    durationMin: 6,
    durationRange: 4,
  },
  winter: {
    paths: SNOWFLAKE_PATHS,
    colorsLight: ["#00bcd4"],
    colorsDark: ["#ffffff"],
    swayAmp: 15,
    tiltMin: 5,
    tiltRange: 10,
    tumbleProb: 0,
    blowProb: 0,
    durationMin: 10,
    durationRange: 8,
  },
};

@customElement("ha-leaves")
export class HaLeaves extends LitElement {
  @property({ type: Boolean }) public enabled = false;
  @property({ type: Boolean }) public narrow = false;
  @property({ type: Boolean }) public darkMode = false;
  @property({ type: String }) public season = "auto";
  @property({ type: String }) public hemisphere = "north";

  @state() private _leaves: Leaf[] = [];
  @state() private _paths: string[] = FALL_PATHS;

  private _maxLeaves = 56;

  protected updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    if (
      changedProps.has("enabled") ||
      changedProps.has("season") ||
      changedProps.has("hemisphere") ||
      changedProps.has("darkMode")
    ) {
      this._generateLeaves();
    }
  }

  private _resolveSeason(): string {
    const month = new Date().getMonth();
    const north = this.hemisphere !== "south";
    if (north) {
      if (month <= 1 || month === 11) return "winter";
      if (month <= 4) return "spring";
      if (month <= 7) return "summer";
      return "fall";
    }
    if (month <= 1 || month === 11) return "summer";
    if (month <= 4) return "fall";
    if (month <= 7) return "winter";
    return "spring";
  }

  private _generateLeaves() {
    if (!this.enabled) {
      this._leaves = [];
      return;
    }

    const season = this.season === "auto" ? this._resolveSeason() : this.season;
    const cfg = SEASON_CONFIG[season] || SEASON_CONFIG.fall;
    this._paths = cfg.paths;

    const colors = this.darkMode ? cfg.colorsDark : cfg.colorsLight;
    const leaves: Leaf[] = [];
    for (let i = 0; i < this._maxLeaves; i++) {
      leaves.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 16 + 12,
        duration: Math.random() * cfg.durationRange + cfg.durationMin,
        delay: Math.random() * 5.5,
        rotation: Math.random() * 720 - 360,
        sway: Math.random() * cfg.swayAmp * 2 - cfg.swayAmp,
        tilt: Math.random() * cfg.tiltRange + cfg.tiltMin,
        tumble: Math.random() < cfg.tumbleProb,
        blow: Math.random() < cfg.blowProb,
        type: Math.floor(Math.random() * cfg.paths.length),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    this._leaves = leaves;
  }

  protected render() {
    if (!this.enabled) {
      return nothing;
    }

    return html`
      <div
        class="leaves ${this.darkMode ? "dark" : "light"}"
        aria-hidden="true"
      >
        ${this._leaves.map(
          (leaf) => html`
            <svg
              class="leaf ${leaf.tumble ? "tumble" : leaf.blow ? "blow" : ""} ${this.narrow && leaf.id >= 35 ? "hide-narrow" : ""}"
              style=${styleMap({
                left: `${leaf.left}%`,
                width: `${leaf.size}px`,
                height: `${leaf.size}px`,
                "animation-duration": `${leaf.duration}s`,
                "animation-delay": `${leaf.delay}s`,
                "--rotation": `${leaf.rotation}deg`,
                "--sway": `${leaf.sway}px`,
                "--tilt": `${leaf.tilt}deg`,
                color: leaf.color,
              })}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d=${this._paths[leaf.type]} fill="currentColor" />
            </svg>
          `
        )}
      </div>
    `;
  }

  static readonly styles = css`
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

    .leaf.tumble {
      animation: tumble linear infinite;
    }

    .leaf.blow {
      animation: blow linear infinite;
    }

    .leaf.hide-narrow {
      display: none;
    }

    @keyframes fall {
      0% { transform: translateY(-10.0vh) translateX(calc(var(--sway) * 0.000)) rotate(calc(var(--rotation) + var(--tilt) * 1.000)) scaleX(1); }
      5% { transform: translateY(-3.5vh) translateX(calc(var(--sway) * 0.809)) rotate(calc(var(--rotation) + var(--tilt) * 0.588)) scaleX(1); }
      10% { transform: translateY(3.0vh) translateX(calc(var(--sway) * 0.951)) rotate(calc(var(--rotation) + var(--tilt) * -0.309)) scaleX(1); }
      15% { transform: translateY(9.5vh) translateX(calc(var(--sway) * 0.309)) rotate(calc(var(--rotation) + var(--tilt) * -0.951)) scaleX(1); }
      20% { transform: translateY(16.0vh) translateX(calc(var(--sway) * -0.588)) rotate(calc(var(--rotation) + var(--tilt) * -0.809)) scaleX(1); }
      25% { transform: translateY(22.5vh) translateX(calc(var(--sway) * -1.000)) rotate(calc(var(--rotation) + var(--tilt) * -0.000)) scaleX(1); }
      30% { transform: translateY(29.0vh) translateX(calc(var(--sway) * -0.588)) rotate(calc(var(--rotation) + var(--tilt) * 0.809)) scaleX(1); }
      35% { transform: translateY(35.5vh) translateX(calc(var(--sway) * 0.309)) rotate(calc(var(--rotation) + var(--tilt) * 0.951)) scaleX(1); }
      40% { transform: translateY(42.0vh) translateX(calc(var(--sway) * 0.951)) rotate(calc(var(--rotation) + var(--tilt) * 0.309)) scaleX(1); }
      45% { transform: translateY(48.5vh) translateX(calc(var(--sway) * 0.809)) rotate(calc(var(--rotation) + var(--tilt) * -0.588)) scaleX(1); }
      50% { transform: translateY(55.0vh) translateX(calc(var(--sway) * 0.000)) rotate(calc(var(--rotation) + var(--tilt) * -1.000)) scaleX(1); }
      55% { transform: translateY(61.5vh) translateX(calc(var(--sway) * -0.809)) rotate(calc(var(--rotation) + var(--tilt) * -0.588)) scaleX(1); }
      60% { transform: translateY(68.0vh) translateX(calc(var(--sway) * -0.951)) rotate(calc(var(--rotation) + var(--tilt) * 0.309)) scaleX(1); }
      65% { transform: translateY(74.5vh) translateX(calc(var(--sway) * -0.309)) rotate(calc(var(--rotation) + var(--tilt) * 0.951)) scaleX(1); }
      70% { transform: translateY(81.0vh) translateX(calc(var(--sway) * 0.588)) rotate(calc(var(--rotation) + var(--tilt) * 0.809)) scaleX(1); }
      75% { transform: translateY(87.5vh) translateX(calc(var(--sway) * 1.000)) rotate(calc(var(--rotation) + var(--tilt) * 0.000)) scaleX(1); }
      80% { transform: translateY(94.0vh) translateX(calc(var(--sway) * 0.588)) rotate(calc(var(--rotation) + var(--tilt) * -0.809)) scaleX(1); }
      85% { transform: translateY(100.5vh) translateX(calc(var(--sway) * -0.309)) rotate(calc(var(--rotation) + var(--tilt) * -0.951)) scaleX(1); }
      90% { transform: translateY(107.0vh) translateX(calc(var(--sway) * -0.951)) rotate(calc(var(--rotation) + var(--tilt) * -0.309)) scaleX(1); }
      95% { transform: translateY(113.5vh) translateX(calc(var(--sway) * -0.809)) rotate(calc(var(--rotation) + var(--tilt) * 0.588)) scaleX(1); }
      100% { transform: translateY(120.0vh) translateX(calc(var(--sway) * -0.000)) rotate(calc(var(--rotation) + var(--tilt) * 1.000)) scaleX(1); }
    }

    @keyframes tumble {
      0% { transform: translateY(-10vh) translateX(0) rotate(var(--rotation)) scaleX(1); }
      25% { transform: translateY(27.5vh) translateX(calc(var(--sway) * 0.2)) rotate(calc(var(--rotation) + 180deg)) scaleX(1); }
      50% { transform: translateY(55vh) translateX(0) rotate(calc(var(--rotation) + 360deg)) scaleX(1); }
      75% { transform: translateY(82.5vh) translateX(calc(var(--sway) * -0.2)) rotate(calc(var(--rotation) + 540deg)) scaleX(1); }
      100% { transform: translateY(120vh) translateX(0) rotate(calc(var(--rotation) + 720deg)) scaleX(1); }
    }

    @keyframes blow {
      0% { transform: translateY(-10vh) translateX(-20vw) rotate(var(--rotation)) scaleX(1); }
      25% { transform: translateY(27.5vh) translateX(10vw) rotate(calc(var(--rotation) + 90deg)) scaleX(1); }
      50% { transform: translateY(55vh) translateX(40vw) rotate(calc(var(--rotation) + 180deg)) scaleX(1); }
      75% { transform: translateY(82.5vh) translateX(70vw) rotate(calc(var(--rotation) + 270deg)) scaleX(1); }
      100% { transform: translateY(120vh) translateX(100vw) rotate(calc(var(--rotation) + 360deg)) scaleX(1); }
    }

    @media (prefers-reduced-motion: reduce) {
      .leaf {
        animation: none;
        display: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-leaves": HaLeaves;
  }
}

if (typeof document !== "undefined") {
  const inject = () => {
    if (document.querySelector("ha-leaves")) return;
    const el = document.createElement("ha-leaves") as HaLeaves;
    el.enabled = true;
    (document.body || document.documentElement).appendChild(el);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject, { once: true });
  } else {
    inject();
  }
}
