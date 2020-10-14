import app from "../src/app";

describe("authentication", () => {
  it("registered the authentication service", () => {
    expect(app.service("authentication")).toBeTruthy();
  });

  describe("local strategy", () => {
    const userInfo = {
      email: "someone@example.com",
      password: "supersecret",
    };

    beforeEach(async () => {
      await app.service("users").create(userInfo);
    });

    it("authenticates user and creates accessToken", async () => {
      const { user, accessToken } = await app.service("authentication").create(
        {
          strategy: "local",
          ...userInfo,
        },
        {}
      );

      expect(accessToken).toBeTruthy();
      expect(user).toBeTruthy();
    });
  });
});
