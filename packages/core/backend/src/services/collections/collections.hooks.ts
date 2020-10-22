import * as feathersAuthentication from "@feathersjs/authentication";
import {
  checkForUserObjectSpecificallyForFind,
  checkForUserObjectUnlessItsFind,
  attachUserToIncomingCollectionCreation,
} from "@/utils/authHooks";
import { HooksObject } from "@feathersjs/feathers";
import Collection from "@/models/collection.model";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;

const hooks: HooksObject<Collection> = {
  before: {
    all: [authenticate("jwt")],
    find: [], // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    get: [],
    create: [attachUserToIncomingCollectionCreation],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [checkForUserObjectSpecificallyForFind],
    get: [checkForUserObjectUnlessItsFind],
    create: [],
    update: [checkForUserObjectUnlessItsFind],
    patch: [checkForUserObjectUnlessItsFind],
    remove: [checkForUserObjectUnlessItsFind],
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
