const LEAF_PATHS = [
  "M8 1 C10 3 12 6 11 9 C13 8 15 9 15 11 C15 13 13 14 11 13 C12 15 11 16 8 16 C5 16 4 15 5 13 C3 14 1 13 1 11 C1 9 3 8 5 9 C4 6 6 3 8 1 Z",
  "M8 1 C9 3 10 5 9 7 C11 6 13 7 13 9 C13 11 11 12 9 11 C10 13 9 16 8 16 C7 16 6 13 7 11 C5 12 3 11 3 9 C3 7 5 6 7 7 C6 5 7 3 8 1 Z",
  "M8 1 C11 3 13 7 13 11 C13 14 11 16 8 16 C5 16 3 14 3 11 C3 7 5 3 8 1 Z",
  "M8 1 C9 4 10 8 9 12 C10 12 11 13 10 15 C9 16 7 16 6 15 C5 13 6 12 7 12 C6 8 7 4 8 1 Z",
];

const LEAF_COLORS_LIGHT = ["#c0392b", "#d35400", "#e67e22", "#f39c12", "#f1c40f"];
const LEAF_COLORS_DARK = ["#e74c3c", "#e67e22", "#f1c40f", "#d35400", "#f4d03f"];

const CSS = `
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
  .leaf.tumble { animation: tumble linear infinite; }
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

  @media (prefers-reduced-motion: reduce) {
    .leaf { animation: none; display: none; }
  }
`;

class HaLeaves extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._enabled = false;
    this._narrow = false;
    this._darkMode = false;
    this._leaves = [];
    this._maxLeaves = 45;

    const style = document.createElement("style");
    style.textContent = CSS;
    this.shadowRoot.appendChild(style);

    this._container = document.createElement("div");
    this._container.className = "leaves";
    this._container.setAttribute("aria-hidden", "true");
    this.shadowRoot.appendChild(this._container);

    this._render();
  }

  static get observedAttributes() {
    return ["enabled", "narrow", "dark-mode", "darkmode"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "enabled") this.enabled = newValue !== null;
    if (name === "narrow") this.narrow = newValue !== null;
    if (name === "dark-mode" || name === "darkmode") this.darkMode = newValue !== null;
  }

  get enabled() { return this._enabled; }
  set enabled(value) {
    this._enabled = !!value;
    this._generateLeaves();
    this._render();
  }

  get narrow() { return this._narrow; }
  set narrow(value) {
    this._narrow = !!value;
    this._render();
  }

  get darkMode() { return this._darkMode; }
  set darkMode(value) {
    this._darkMode = !!value;
    this._generateLeaves();
    this._render();
  }

  _generateLeaves() {
    if (!this._enabled) {
      this._leaves = [];
      return;
    }
    const colors = this._darkMode ? LEAF_COLORS_DARK : LEAF_COLORS_LIGHT;
    const leaves = [];
    for (let i = 0; i < this._maxLeaves; i++) {
      leaves.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 16 + 12,
        duration: Math.random() * 6 + 8,
        delay: Math.random() * 5.5,
        rotation: Math.random() * 720 - 360,
        sway: Math.random() * 200 - 100,
        tilt: Math.random() * 30 + 40,
        tumble: Math.random() < 0.25,
        type: Math.floor(Math.random() * LEAF_PATHS.length),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    this._leaves = leaves;
  }

  _render() {
    this._container.innerHTML = "";
    if (!this._enabled) return;
    this._container.className = "leaves " + (this._darkMode ? "dark" : "light");

    this._leaves.forEach((leaf) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 16 16");
      svg.setAttribute("fill", "none");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.classList.add("leaf");
      if (leaf.tumble) svg.classList.add("tumble");
      if (this._narrow && leaf.id >= 28) svg.classList.add("hide-narrow");

      svg.style.left = leaf.left + "%";
      svg.style.width = leaf.size + "px";
      svg.style.height = leaf.size + "px";
      svg.style.animationDuration = leaf.duration + "s";
      svg.style.animationDelay = leaf.delay + "s";
      svg.style.setProperty("--rotation", leaf.rotation + "deg");
      svg.style.setProperty("--sway", leaf.sway + "px");
      svg.style.setProperty("--tilt", leaf.tilt + "deg");
      svg.style.color = leaf.color;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", LEAF_PATHS[leaf.type]);
      path.setAttribute("fill", "currentColor");
      svg.appendChild(path);

      this._container.appendChild(svg);
    });
  }
}

if (!customElements.get("ha-leaves")) {
  customElements.define("ha-leaves", HaLeaves);
}

console.info("[ha-leaves] module loaded");

// Auto-inject the overlay when loaded as a module/resource.
if (typeof document !== "undefined") {
  const inject = () => {
    if (document.querySelector("ha-leaves")) return;
    const el = document.createElement("ha-leaves");
    el.enabled = true;
    (document.body || document.documentElement).appendChild(el);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject, { once: true });
  } else {
    inject();
  }
}
