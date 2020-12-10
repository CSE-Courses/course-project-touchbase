// Initializes the `collections` service on path `/collections`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "@/declarations";
import Collection from "@/models/collection.model";
import Workspace from "@/models/workspace.model";
import hooks from "./workspaces.hooks";
import Workspaces from "./workspaces.class";

// Add this service to the service type index
declare module "@/declarations" {
  interface ServiceTypes {
    workspaces: Workspaces & ServiceAddons<Workspace>;
  }
}

export default function configureCollections(app: Application): void {
  const options = {
    Model: Workspace,
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/workspaces", new Workspaces(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("workspaces");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  service.hooks(hooks);
}
