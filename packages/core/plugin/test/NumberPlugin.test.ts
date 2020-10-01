import NumberPlugin, { NumberPluginView } from "../example/NumberPlugin";

describe("NumberPlugin example resource plugin", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should expose a valid component", () => {
    const ID = "15";
    const el = new NumberPlugin.View() as NumberPluginView;
    expect(el.shadowRoot?.textContent).toBe("");
    el.setAttribute("num", ID);
    expect(el.shadowRoot?.textContent).toBe(ID);
    const ID2 = "20";
    el.num = ID2;
    expect(el.shadowRoot?.textContent).toBe(ID2);
  });
});
