import app from "@/app";
import { Forbidden } from "@feathersjs/errors";

describe("'resources' service", () => {
  const userInfo = {
    email: "someone@example.com",
    password: "supersecret",
  };
  let userID = -1;
  let collectionID = -1;

  beforeEach(async () => {
    const user = await app.service("users").create(userInfo);
    userID = user.id;

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
      type: "Hyperlink",
      ownerID: userID,
      collectionID,
    });

    const res = await app.service("resources").find({
      query: { name: rescName, $limit: 1 },
      paginate: false,
    });

    expect(res[0].name).toBe(rescName);
  });

  it("doesn't allow another user to access", async () => {
    const idk = await app.service("resources").create(
      {
        strategy: "local",
        name: "electric boogaloo",
        type: "Hyperlink",
        ownerID: userID,
      },
      {}
    );

    const userInfo2 = {
      email: "pleasefortheloveofcthuluwork@example.com",
      password: "eslintistheworstthingonearth",
    };

    await app.service("users").create(userInfo2);

    const { accessToken } = await app.service("authentication").create(
      {
        strategy: "local",
        ...userInfo2,
      },
      {}
    );

    expect(async () => {
      const testget = await app.service("resources").get(idk.id, {
        provider: "rest",
        authentication: { strategy: "jwt", accessToken },
      });
    }).rejects.toThrow(Forbidden);
  });
});
