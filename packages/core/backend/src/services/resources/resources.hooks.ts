import * as feathersAuthentication from "@feathersjs/authentication";
import { HooksObject } from "@feathersjs/feathers";
import Resource from "@/models/resource.model";
import {
  assertIsOwner,
  assertIsOwnerForFind,
  attachUserToIncomingCreation,
} from "@/utils/authHooks";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;

const hooks: HooksObject<Resource> = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [attachUserToIncomingCreation],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [assertIsOwnerForFind],
    get: [assertIsOwner],
    create: [],
    update: [assertIsOwner],
    patch: [assertIsOwner],
    remove: [assertIsOwner],
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
