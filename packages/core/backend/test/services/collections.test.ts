import { Forbidden } from "@feathersjs/errors";
import app from "@/app";

const userInfo = {
  email: "someone@example.com",
  password: "supersecret",
};

let workspaceID = -1;

beforeEach(async () => {
  const user = await app.service("users").create(userInfo);

  const settings = await app
    .service("settings")
    .find({ query: { ownerID: user.id }, paginate: false });
  expect(Array.isArray(settings));

  if (Array.isArray(settings)) {
    workspaceID = settings[0].lastWorkspaceID;
  }
});

describe("'collections' service", () => {
  it("registered the service", () => {
    const service = app.service("collections");
    expect(service).toBeTruthy();
  });
});

it("creates and fetches collections for a user", async () => {
  const { accessToken, user } = await app.service("authentication").create(
    {
      strategy: "local",
      ...userInfo,
    },
    {}
  );

  const idk = await app.service("collections").create(
    {
      strategy: "local",
      name: "D&D stuff",
      ownerID: user.id,
      workspaceID,
    },
    {}
  );

  const testget = await app.service("collections").get(idk.id, {
    provider: "rest",
    authentication: { strategy: "jwt", accessToken },
  });

  const res = await app.service("collections").find({
    query: { name: "D&D stuff", $limit: 1 },
    paginate: false,
    provider: "rest",
    authentication: { strategy: "jwt", accessToken },
  });

  if (Array.isArray(res)) {
    expect(res[0].name).toBeDefined();
  } else {
    fail("Pagination was disabled, but we didn't get an array");
  }
});

it("doesn't allow another user to access", async () => {
  const { user } = await app.service("authentication").create(
    {
      strategy: "local",
      ...userInfo,
    },
    {}
  );

  const idk = await app.service("collections").create(
    {
      strategy: "local",
      name: "electric boogaloo",
      ownerID: user.id,
      workspaceID,
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
    const testget = await app.service("collections").get(idk.id, {
      provider: "rest",
      authentication: { strategy: "jwt", accessToken },
    });
  }).rejects.toThrow(Forbidden);
});
