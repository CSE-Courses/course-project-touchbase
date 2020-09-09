import { HookContext } from "@feathersjs/feathers";
import * as feathersAuthentication from "@feathersjs/authentication";
import { AuthenticateHookSettings } from "@feathersjs/authentication/lib/hooks/authenticate";
import * as local from "@feathersjs/authentication-local";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

// Omit a field when the user is not authenticated
const protectAuthenticated = (...fields: string[]) => (context: HookContext) => {
  if (!context.params.authenticated) {
    return protect(...fields)(context);
  }

  return context;
};

const authenticateDontBlock = (
  originalSettings: string | AuthenticateHookSettings,
  ...originalStrategies: string[]
) => {
  return async (context: HookContext) => {
    try {
      await authenticate(originalSettings, ...originalStrategies)(context);
    } catch {
      context.params.authenticated = false;
    }
  };
};

export default {
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
