// Initializes the `collections` service on path `/collections`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import Collections from "./collections.class";
import Collection from "../../models/collections.model";
import hooks from "./collections.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    collections: Collections & ServiceAddons<Collection>;
  }
}

export default function configureCollections(app: Application): void {
  const options = {
    Model: Collection,
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/collections", new Collections(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("collections");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  service.hooks(hooks);
}
