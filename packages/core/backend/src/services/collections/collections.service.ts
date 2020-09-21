// Initializes the `collections` service on path `/collections`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { Collections } from "./collections.class";
import createModel from "../../models/collections.model";
import hooks from "./collections.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    collections: Collections & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: new createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/collections", new Collections(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("collections");

  service.hooks(hooks);
}
