// Initializes the `collections` service on path `/collections`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "@/declarations";
import Resource from "@/models/resource.model";
import Resources from "./resources.class";
import hooks from "./resources.hooks";

// Add this service to the service type index
declare module "@/declarations" {
  interface ServiceTypes {
    resources: Resources & ServiceAddons<Resource>;
  }
}

export default function configureCollections(app: Application): void {
  const options = {
    Model: Resource,
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/resources", new Resources(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("resources");

  service.hooks(hooks);
}
