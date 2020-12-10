import { Application } from "@/declarations";
// eslint-disable-next-line import/no-cycle
import users from "./users/users.service";
import workspaces from "./workspaces/workspaces.service";
// eslint-disable-next-line import/no-cycle
import collections from "./collections/collections.service";
import resources from "./resources/resources.service";
import settings from "./settings/settings.service";
// Don't remove this comment. It's needed to format import lines nicely.

export default function configureServices(app: Application): void {
  app.configure(users);
  app.configure(workspaces);
  app.configure(collections);
  app.configure(resources);
  app.configure(settings);
}
