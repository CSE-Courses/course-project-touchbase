import { HooksObject } from "@feathersjs/feathers";
import Resource from "@/models/resource.model";
// Don't remove this comment. It's needed to format import lines nicely.

const hooks: HooksObject<Resource> = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
