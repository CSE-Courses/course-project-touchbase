import * as feathersAuthentication from "@feathersjs/authentication";
import {
  assertIsOwnerForFind,
  assertIsOwner,
  attachUserToIncomingCreation,
} from "@/utils/authHooks";
import { HooksObject } from "@feathersjs/feathers";
import Collection from "@/models/collection.model";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;

const hooks: HooksObject<Collection> = {
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
