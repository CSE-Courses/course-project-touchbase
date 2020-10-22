// Initializes the `users` service on path `/users`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "@/declarations";
import User from "@/models/user.model";
import Users from "./users.class";
import hooks from "./users.hooks";

// Add this service to the service type index
declare module "@/declarations" {
  interface ServiceTypes {
    users: Users & ServiceAddons<User>;
  }
}

export default function configureUsers(app: Application): void {
  const options = {
    paginate: app.get("paginate"),
    Model: User,
    // createUserModel(app),
  };

  // Initialize our service with any options it requires
  app.use("/users", new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("users");

  service.hooks(hooks);
}
