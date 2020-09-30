import { Application } from "../declarations";
import users from "./users/users.service";
import collections from "./collections/collections.service";
// Don't remove this comment. It's needed to format import lines nicely.

export default function configureServices(app: Application): void {
  app.configure(users);
  app.configure(collections);
}
