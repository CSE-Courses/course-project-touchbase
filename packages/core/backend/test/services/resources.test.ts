import app from "../../src/app";

describe("'resources' service", () => {
  let userID = -1;
  let collectionID = -1;

  beforeAll(async () => {
    try {
      const user = await app.service("users").create({
        email: "someone@example.com",
        password: "supersecret",
      });
      userID = user.id;
    } catch (error) {
      const res = await app.service("users").find({
        query: {
          email: "someone@example.com",
        },
        paginate: false,
      });
      userID = res[0].id;
    }

    const collection = await app.service("collections").create({
      name: "All my thingamabobs",
      ownerID: userID,
    });
    collectionID = collection.id;
  });

  it("registered the service", () => {
    const service = app.service("resources");
    expect(service).toBeTruthy();
  });

  it("creates and fetches resources", async () => {
    const rescName = "My thingamabob";

    await app.service("resources").create({
      name: rescName,
      type: "hyperlink",
      ownerID: userID,
      collectionID,
    });

    const res = await app.service("resources").find({
      query: { name: rescName, $limit: 1 },
      paginate: false,
      provider: "rest",
    });

    expect(res[0].name).toBe(rescName);
  });
});
