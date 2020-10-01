import * as feathersAuthentication from "@feathersjs/authentication";
import { AuthenticateHookSettings } from "@feathersjs/authentication/lib/hooks/authenticate";
import { HookContext } from "@feathersjs/feathers";
import * as local from "@feathersjs/authentication-local";
import { NotAuthenticated } from "@feathersjs/errors";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { protect } = local.hooks;

// eslint-disable-next-line import/prefer-default-export
export const authenticateDontBlock = (
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

// Omit a field when the user is not authenticated
export const protectAuthenticated = (...fields: string[]) => (context: HookContext) => {
  if (!context.params.authenticated) {
    return protect(...fields)(context);
  }

  return context;
};

// Checks in collections, etc that User calling for Collection is Owner
export function checkForUserObjectUnlessItsFind(context: HookContext) {
  if (!(context.result.ownerID === context.params.user.id)) {
    throw new NotAuthenticated();
  }
}

// undefineds are fun
export function checkForUserObjectSpecificallyForFind(context: HookContext) {
  if (context.result.data) {
    context.result.data = context.result.data.filter(
      (collection: { ownerID: any }) => collection.ownerID === context.params.user.id
    );
  } else {
    context.result = context.result.filter(
      (collection: { ownerID: any }) => collection.ownerID === context.params.user.id
    );
  }
}
