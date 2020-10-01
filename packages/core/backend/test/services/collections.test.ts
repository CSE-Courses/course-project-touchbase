import app from "../../src/app";
import User from "../../src/models/user.model";

const collectionsInfo = {
  name: "D&D stuff",
  ownerID: "12345",
  owner: new User,
};


describe("'collections' service", () => {
  it("registered the service", () => {
    const service = app.service("collections");
    expect(service).toBeTruthy();
  });
});

it("creates and fetches collections", async () => {
  const idk = await app.service("collections").create(
    {
      strategy: "local",
      ...collectionsInfo,
    },
    {}
  );

  const res = await app.service("collections").find({
    query: { name: collectionsInfo.name, $limit: 1 },
    paginate: false,
    provider: "rest",
  });

  if (Array.isArray(res)) {
    expect(res[0].name).toBeDefined();
  } else {
    fail("Pagination was disabled, but we didn't get an array");
  }
});
