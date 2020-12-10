import * as feathersAuthentication from "@feathersjs/authentication";
import * as local from "@feathersjs/authentication-local";
// eslint-disable-next-line import/named
import { authenticateDontBlock, protectAuthenticated } from "@/utils/authHooks";
import { HookContext, HooksObject } from "@feathersjs/feathers";
import User from "@/models/user.model";
import { Application } from "@/declarations";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

async function createDefaultSettings(context: HookContext<User>) {
  const workspaceService = (context.app as Application).service("workspaces");
  const defaultWorkspace = await workspaceService.create({
    name: "Default",
    ownerID: context.result!.id,
  });

  const settingsService = (context.app as Application).service("settings");
  await settingsService.create({
    ownerID: context.result!.id,
    lastWorkspaceID: defaultWorkspace.id,
  });
}

const hooks: HooksObject<User> = {
  before: {
    all: [],
    find: [authenticateDontBlock("jwt")],
    get: [authenticateDontBlock("jwt")],
    create: [hashPassword("password")],
    update: [hashPassword("password"), authenticate("jwt")],
    patch: [hashPassword("password"), authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password"),
      protectAuthenticated("email"),
    ],
    find: [],
    get: [],
    create: [createDefaultSettings],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
export default hooks;
