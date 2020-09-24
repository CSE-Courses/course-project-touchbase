import { TBResourcePlugin } from "../src";

export class NumberPluginView extends HTMLElement {
  private container: HTMLDivElement;

  static get observedAttributes() {
    return ["num"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    this.container = document.createElement("div");
    shadow.appendChild(this.container);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "num" && oldValue !== newValue) this.render();
  }

  render() {
    this.container.innerHTML = this.num.toString();
  }

  get num() {
    return this.getAttribute("num") || "";
  }

  set num(newValue: string) {
    this.setAttribute("num", newValue);
  }
}

window.customElements.define("touchbase-number-example-resource", NumberPluginView);

const NumberPlugin: TBResourcePlugin = {
  View: NumberPluginView,
};

export default NumberPlugin;
