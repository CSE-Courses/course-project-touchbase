import app from "@/app";

describe("'users' service", () => {
  const userInfo = {
    email: "someone@example.com",
    password: "supersecret",
  };

  beforeEach(async () => {
    await app.service("users").create(userInfo);
  });

  it("registered the service", () => {
    const service = app.service("users");
    expect(service).toBeTruthy();
  });

  it("prevents access to the user email before logged in", async () => {
    const res = await app.service("users").find({
      query: { email: userInfo.email, $limit: 1 },
      paginate: false,
      provider: "rest",
    });

    expect(Array.isArray(res) && res[0].email).toBeUndefined();
  });

  it("allows access to the user email field after logged in", async () => {
    const { accessToken } = await app.service("authentication").create(
      {
        strategy: "local",
        ...userInfo,
      },
      {}
    );

    const res = await app.service("users").find({
      query: { email: userInfo.email, $limit: 1 },
      paginate: false,
      provider: "rest",
      authentication: { strategy: "jwt", accessToken },
    });

    expect(Array.isArray(res) && res[0].email).toBeDefined();
  });
});
