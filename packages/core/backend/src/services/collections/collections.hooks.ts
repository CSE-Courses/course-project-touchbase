import * as feathersAuthentication from "@feathersjs/authentication";
// eslint-disable-next-line import/named
import {
  checkForUserObjectSpecificallyForFind,
  checkForUserObjectUnlessItsFind,
} from "../../utils/authHooks";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [authenticate("jwt")],
    find: [], // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    get: [],
    create: [],
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
