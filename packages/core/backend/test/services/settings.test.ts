import app from "@/app";

describe("'settings' service", () => {
  it("registered the service", () => {
    const service = app.service("settings");
    expect(service).toBeTruthy();
  });
});
