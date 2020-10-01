import { HooksObject } from "@feathersjs/feathers";

export interface TBResourcePlugin {
  // TODO: Replace any with proper service type once backend is implemented

  /**
   * Feathers hook functions to be added to the resource service to eg support loading data from
   * or saving data to an external service if this plugin is an integration with a 3rd party
   * service, etc
   */
  hooks?: Partial<HooksObject<any>>;

  /**
   * Whatever the frontend should display in the main view for this resource. This is intended
   * to be a web component, with relevant attributes/properties which will be passed
   */
  View: { new (): HTMLElement };
}
